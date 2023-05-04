import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
 import  passport   from 'passport';
 import FacebookTokenStrategy from 'passport-facebook-token';
  import  nodemailer  from 'nodemailer';
 import { google } from  'googleapis';

 import GoogleStrategy  from 'passport-google-oauth20';
 dotenv.config();

  import bodyParser  from 'body-parser';
 import cors  from 'cors';

// dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)




passport.use(new FacebookTokenStrategy({
  clientID: '937729870607312',
  clientSecret: 'b547e27caebd22e396875d79b9c71f32',
  fbGraphVersion: 'v11.0', // replace with your desired version
}, function(accessToken, refreshToken, profile, done) {
  // You can customize this function to create or update the user in your database
  return done(null, { accessToken, profile });
}));

app.use(passport.initialize());
app.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), (req, res) => {
  res.json(req.user);
});

app.use(passport.initialize());

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/api/auth/gmail/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile.emails[0].value);
    }
  )
);

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });



app.post('/api/auth/email', async (req, res) => {
  try {
    const { email } = req.body;

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: 'Email Authentication',
      text: 'Please click the link below to verify your email:',
      html: `<p>Please click the link below to verify your email:</p><a href="${process.env.BASE_URL}/verify/${email}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification email sent!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error sending verification email' });
  }
});

const PORT = process.env.PORT || 7000

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

server.timeout = 30000 // or any other value you want
