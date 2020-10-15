require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const { Strategy } = require('passport-local');
const upload = require('./config/multer');
const encryption = require('./config/encryption');
const { isAuth } = require('./middleware/authRoutes');
const { isAdmin } = require('./middleware/authRoutes');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ----- SERVER + DATABASE ----- //

const main = async () => {
    // ----- MONGODB ----- //

    const client = new MongoClient(process.env.URI, { useUnifiedTopology: true });

    await client.connect();

    const bucket = new GridFSBucket(client.db("projectDB"), { bucketName: 'uploads', chunkSizeBytes: 1024 });
        
    // ----- EXPRESS SERVER ----- //

    const app = express();

    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    if (process.env.NODE_ENV === 'production') app.use(express.static('client/build'));

    app.use(session({
        secret: process.env.SESSION_SECRET_KEY,
        store: new MongoDBStore({ uri: process.env.URI, collection: 'sessions' }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false,
        saveUninitialized: false
    }));

    await configurePassport(client);

    app.use(passport.initialize());
    
    app.use(passport.session());

    // ----- ROUTES ----- //

    app.get("/", (req, res, next) => { return res.send("Welcome!") });

    app.get('/files/:filename', (req, res, next) => { bucket.openDownloadStreamByName(req.params.filename).pipe(res) });

    app
    .route('/products')
    .get(async (req, res, next) => {
        const products = await findAllProducts(client);

        return res.json({ products });
    })
    .post(upload.fields([{ name: 'files' }]), async (req, res, next) => {
        const newProduct = {
            name: req.body.name,
            price: req.body.price,
            images: req.files['files']
        }

        const productId = await createProduct(client, newProduct);

        return res.json({ productId });
    })

    app
    .route('/users/register')
    .post(async (req, res, next) => {
        let createdUser = await createUser(client, req.body.email, req.body.password);

        if (!createdUser) return res.json({ message: 'A user with this email already exists.', isRegistered: false });
        
        if (createdUser) return res.json({ isRegistered: true });
    })

    app
    .route('/users/sign-in')
    .post((req, res, next) => {
        passport.authenticate('local', (error, user) => {
            if (error) return next(error); 
    
            if (!user) return res.json({ message: 'Email or password is incorrect.', isSignedIn: false });
    
            req.logIn(user, (error) => {
                if (error) return next(error); 
    
                return res.json({ isSignedIn: true });
            });
        })(req, res, next)
    })

    app
    .route('/users/sign-out')
    .delete(isAuth, (req, res, next) => {
        req.logout();

        return res.json({ isAuth: false });
    })

    app
    .route('/users/user')
    .get(isAuth, (req, res, next) => {
        return res.json({ isAuth: true });
    })

    app
    .route('/users/admin')
    .get(isAdmin, (req, res, next) => {
        return res.json({ isAdmin: true });
    })

    app
    .route('/users/user/cart')
    .get(isAuth, async (req, res, next) => {
       const cart = await findUserCart(client, req.user._id);

       return res.json({ cart });
    })

    app
    .route('/users/user/cart/add-item')
    .put(isAuth, async (req, res, next) => {
        const cart = await addProductToUserCart(client, req.body.itemId, req.user._id);

        return res.json({ cart });
    })

    app
    .route('/users/user/cart/remove-item')
    .put(isAuth, async (req, res, next) => {
        let cart = await removeProductFromUserCart(client, req.body.itemId, req.user._id);

        return res.json({ cart });
    })

    // ----- PORT ----- //

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
}

main();

// ----- DATABASE FUNCTIONS ----- //

const removeProductFromUserCart = async (client, itemId, userId) => {
    const product = await client.db("projectDB").collection("products").findOne({ _id: new ObjectId(itemId) });

    await client.db("projectDB").collection("users").updateOne({ _id: userId }, { $pull: { cart: product } });

    const user = await client.db("projectDB").collection("users").findOne({ _id: userId });

    return user.cart;
}

const addProductToUserCart = async (client, itemId, userId) => {
    const product = await client.db("projectDB").collection("products").findOne({ _id: new ObjectId(itemId) });

    await client.db("projectDB").collection("users").updateOne({ _id: userId }, { $addToSet: { cart: product } });

    const user = await client.db("projectDB").collection("users").findOne({ _id: userId });

    return user.cart;        
}

const findUserCart = async (client, userId) => {
    const user = await client.db("projectDB").collection("users").findOne({ _id: userId });

    return user.cart;
}

const createUser = async (client, userEmail, userPassword) => {
    const user = await client.db("projectDB").collection("users").findOne({ email: userEmail });

    if (user) return false; 

    if (!user) {
        const encryptedPassword = encryption.generatePassword(userPassword);
    
        const salt = encryptedPassword.salt;
        const hash = encryptedPassword.hash;
    
        await client.db("projectDB").collection("users").insertOne({
            email: userEmail,
            hash,
            salt,
            admin: false,
            cart: []
        });

        return true;
    }
}

const findAllProducts = async (client) => {
    const cursor = await client.db("projectDB").collection("products").find();

    const products = await cursor.toArray();

    return products;
}

const createProduct = async (client, newProduct) => {
    const product = await client.db("projectDB").collection("products").insertOne(newProduct);

    return product.insertedId;
}

// ----- PASSPORT ----- //

const configurePassport = async (client) => {
    passport.use(new Strategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        const user = await client.db("projectDB").collection("users").findOne({ email });

        if (!user) return done(null, false);

        const isValid = encryption.validatePassword(password, user.hash, user.salt);

        if (!isValid) return done (null, false);

        return done(null, user);
    }))

    passport.serializeUser(async (user, done) => { done(null, user._id) });
    
    passport.deserializeUser(async (_id, done) => {
        const user = await client.db("projectDB").collection("users").findOne({ _id });

        done(null, user);
    });
}











/* 
router.post('/user/cart/checkout-session', async (req, res, next) => {
    const cart = req.body.cart;
    let items = [];

    if (cart.type === 'guest') {
        cart.data.forEach(cartItem => {
            let item = {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: cartItem.title
                    },
                    unit_amount: cartItem.price * 100
                },
                quantity: cartItem.quantity,
            }
    
            items.push(item);
        })
    }

    if (cart.type === 'user') {
        let ids = cart.data.map(cartItem => {
            return cartItem.item;
        })

        let products = await Product.find({_id: {$in: ids}});

        products.forEach(product => {
            let item = {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.title
                    },
                    unit_amount: product.price * 100
                },
                quantity: 1
            }

            items.push(item);
        })
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
}) */