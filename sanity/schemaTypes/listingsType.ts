import { defineField, defineType } from "sanity";
// import groq

export const listingsType = defineType({
    name: 'Listings',
    title: 'Listings',
    type: 'document',
    fields: [
        defineField({
            name: 'id',
            title: 'id',
            type: 'string',
        }),
        defineField({
            name: 'user_id',
            title: 'User ID',
            type: 'reference',
            to: [{type: 'users'}],
            // options: {
            //     reference: ({_id})=>`*[_id=="${_id}]._id`,
            // }
        }),
        defineField({
            name: 'name',
            type: 'string',
            placeholder: 'Listing Name'
        }),
        defineField({
            name: 'slogan',
            title: 'slogan',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
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
            name: 'description',
            type: 'text',
            title: 'Description'
        }),
        defineField({
            name: 'location',
            type: 'string',
            title: 'Location'
        }),
        defineField({
            name: 'image',
            type: 'image',
            title: 'Image'
        }),
        defineField({
            name: 'rate',
            type: 'number',
            title: 'Rate'
        }),
    ]
})
