const ProductTransaction = require('../models/ProductTransaction');

exports.getTransactions = async (req, res) => {
    try {
        const { page = 1, perPage = 10, search = '' } = req.query;
        const query = search
            ? {
                $or: [
                    { title: new RegExp(search, 'i') },
                    { description: new RegExp(search, 'i') },
                    { price: new RegExp(search, 'i') }
                ]
            }
            : {};

        const transactions = await ProductTransaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

        const total = await ProductTransaction.countDocuments(query);

        res.status(200).json({ total, transactions });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching transactions', error });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const { month } = req.query;
        const transactions = await ProductTransaction.find({ dateOfSale: { $regex: `-${month}-` } });

        const totalSaleAmount = transactions.reduce((acc, cur) => acc + cur.price, 0);
        const totalSoldItems = transactions.filter(tx => tx.sold).length;
        const totalNotSoldItems = transactions.filter(tx => !tx.sold).length;

        res.status(200).json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching statistics', error });
    }
};

exports.getBarChart = async (req, res) => {
    try {
        const { month } = req.query;
        const transactions = await ProductTransaction.find({ dateOfSale: { $regex: `-${month}-` } });

        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };

        transactions.forEach(tx => {
            if (tx.price <= 100) priceRanges['0-100']++;
            else if (tx.price <= 200) priceRanges['101-200']++;
            else if (tx.price <= 300) priceRanges['201-300']++;
            else if (tx.price <= 400) priceRanges['301-400']++;
            else if (tx.price <= 500) priceRanges['401-500']++;
            else if (tx.price <= 600) priceRanges['501-600']++;
            else if (tx.price <= 700) priceRanges['601-700']++;
            else if (tx.price <= 800) priceRanges['701-800']++;
            else if (tx.price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        });

        res.status(200).json(priceRanges);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching bar chart data', error });
    }
};

exports.getPieChart = async (req, res) => {
    try {
        const { month } = req.query;
        const transactions = await ProductTransaction.find({ dateOfSale: { $regex: `-${month}-` } });

        const categoryCounts = transactions.reduce((acc, cur) => {
            acc[cur.category] = (acc[cur.category] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json(categoryCounts);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching pie chart data', error });
    }
};

exports.getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        const transactions = await ProductTransaction.find({ dateOfSale: { $regex: `-${month}-` } });

        const statistics = {
            totalSaleAmount: transactions.reduce((acc, cur) => acc + cur.price, 0),
            totalSoldItems: transactions.filter(tx => tx.sold).length,
            totalNotSoldItems: transactions.filter(tx => !tx.sold).length
        };

        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };

        transactions.forEach(tx => {
            if (tx.price <= 100) priceRanges['0-100']++;
            else if (tx.price <= 200) priceRanges['101-200']++;
            else if (tx.price <= 300) priceRanges['201-300']++;
            else if (tx.price <= 400) priceRanges['301-400']++;
            else if (tx.price <= 500) priceRanges['401-500']++;
            else if (tx.price <= 600) priceRanges['501-600']++;
            else if (tx.price <= 700) priceRanges['601-700']++;
            else if (tx.price <= 800) priceRanges['701-800']++;
            else if (tx.price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        });

        const categoryCounts = transactions.reduce((acc, cur) => {
            acc[cur.category] = (acc[cur.category] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json({
            statistics,
            priceRanges,
            categoryCounts
        });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching combined data', error });
    }
};
