const mongoose = require('mongoose');

const cryptoOfferSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Invalid payment ,ethod',
        },
        required: true,
    },
    ownerId: {//many crypto for one user / many to 1
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }

});

const CryptoOffer = mongoose.model('CryptoOffer', cryptoOfferSchema);

module.exports = CryptoOffer;