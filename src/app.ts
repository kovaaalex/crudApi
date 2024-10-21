import express from 'express'
import userController from './controllers/userController'

const app = express();

app.use(express.json())
app.use('/users', userController)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
