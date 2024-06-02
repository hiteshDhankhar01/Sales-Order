const initialOrders = [
    {
        invoice_no: 1,
        customer_id: 101,
        products: [
            { sku_id: 301, sellingRate: 100, totalItems: 2 },
            { sku_id: 302, sellingRate: 200, totalItems: 1 }
        ],
        selectedDate: '2024-05-01T00:00:00.000Z',
        paid: "yes"
    },
    {
        invoice_no: 2,
        customer_id: 102,
        products: [
            { sku_id: 303, sellingRate: 150, totalItems: 3 }
        ],
        selectedDate: '2024-05-02T00:00:00.000Z',
        paid: "no"
    },
    {
        invoice_no: 3,
        customer_id: 103,
        products: [
            { sku_id: 304, sellingRate: 250, totalItems: 1 }
        ],
        selectedDate: '2024-05-03T00:00:00.000Z',
        paid: "yes"
    },
    {
        invoice_no: 4,
        customer_id: 104,
        products: [
            { sku_id: 305, sellingRate: 300, totalItems: 2 }
        ],
        selectedDate: '2024-05-04T00:00:00.000Z',
        paid: "no"
    },
    {
        invoice_no: 5,
        customer_id: 105,
        products: [
            { sku_id: 306, sellingRate: 350, totalItems: 1 }
        ],
        selectedDate: '2024-05-05T00:00:00.000Z',
        paid: "yes"
    },
    {
        invoice_no: 6,
        customer_id: 106,
        products: [
            { sku_id: 307, sellingRate: 400, totalItems: 3 }
        ],
        selectedDate: '2024-05-06T00:00:00.000Z',
        paid: "no"
    },
    {
        invoice_no: 7,
        customer_id: 107,
        products: [
            { sku_id: 308, sellingRate: 450, totalItems: 2 }
        ],
        selectedDate: '2024-05-07T00:00:00.000Z',
        paid: "yes"
    },
    {
        invoice_no: 8,
        customer_id: 108,
        products: [
            { sku_id: 309, sellingRate: 500, totalItems: 1 }
        ],
        selectedDate: '2024-05-08T00:00:00.000Z',
        paid: "no"
    },
    {
        invoice_no: 9,
        customer_id: 109,
        products: [
            { sku_id: 301, sellingRate: 550, totalItems: 2 }
        ],
        selectedDate: '2024-05-09T00:00:00.000Z',
        paid: "yes"
    },
    {
        invoice_no: 10,
        customer_id: 110,
        products: [
            { sku_id: 302, sellingRate: 600, totalItems: 3 }
        ],
        selectedDate: '2024-05-10T00:00:00.000Z',
        paid: "no"
    },
    {
        invoice_no: 11,
        customer_id: 111,
        products: [
            { sku_id: 303, sellingRate: 650, totalItems: 1 }
        ],
        selectedDate: '2024-05-11T00:00:00.000Z',
        paid: "yes"
    },
    {
        invoice_no: 12,
        customer_id: 112,
        products: [
            { sku_id: 304, sellingRate: 700, totalItems: 2 }
        ],
        selectedDate: '2024-05-12T00:00:00.000Z',
        paid: "no"
    },
    {
        invoice_no: 13,
        customer_id: 113,
        products: [
            { sku_id: 305, sellingRate: 750, totalItems: 3 }
        ],
        selectedDate: '2024-05-13T00:00:00.000Z',
        paid: "yes"
    },
    {
        invoice_no: 14,
        customer_id: 114,
        products: [
            { sku_id: 306, sellingRate: 800, totalItems: 1 }
        ],
        selectedDate: '2024-05-14T00:00:00.000Z',
        paid: "no"
    },
    {
        invoice_no: 15,
        customer_id: 115,
        products: [
            { sku_id: 307, sellingRate: 850, totalItems: 2 }
        ],
        selectedDate: '2024-05-15T00:00:00.000Z',
        paid: "yes"
    }
];

export default initialOrders;
