import { defineField, defineType } from "sanity";
// import groq

export const bookingsType = defineType({
    name: 'bookings',
    title: 'Bookings',
    type: 'document',
    fields: [
        defineField({
            name: 'user_id',
            title: 'User ID',
            type: 'reference',
            to: [{type: 'users'}]
        }),
        defineField({
            name: 'seller_id',
            title: 'Seller ID',
            type: 'reference',
            to: [{type: 'users'}]
        }),
        defineField({
            name: 'list_id',
            title: 'List ID',
            type: 'reference',
            to: [{type: 'Listings'}]
        }),
        defineField({
            name: 'name',
            type: 'string',
            placeholder: 'Listing Name'
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
        }),
        defineField({
            name: 'category',
            type: 'string',
            title: 'Category',
            options: {
                list: [
                    {title: 'Select Category', value: ''},
                    {title: 'Material', value: 'material'},
                    {title: 'Laborrer', value: 'laborrer'},
                    {title: 'Equipment', value: 'equipment'}
                ]
            }
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    {title: 'Pending', value: 'pending'},
                    {title: 'Completed', value: 'completed'},
                ]
            }
        }),
        defineField({
            name: 'action',
            title: 'Action',
            type: 'string',
            options: {
                list: [
                    {title: 'Buy', value: 'buy'},
                    {title: 'Book', value: 'book'},
                ]
            }
        }),
    ]
})
