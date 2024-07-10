import { defineField, defineType } from "sanity";


export const usersType = defineType({
    name: 'users',
    title: 'Users',
    type: 'document',
    fields: [
        defineField({
            name: 'id',
            type: 'string',
        }),
        defineField({
            name: 'fullname',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            type: 'string',
        }),
        defineField({
            name: 'location',
            type: 'string',
        }),
        defineField({
            name: 'profile',
            type: 'image',
            title: 'Profile Picture'
        }),
        defineField({
            name: 'id_card',
            type: 'image',
            title: 'ID Card'
        }),
        defineField({
            name: 'account_type',
            type: 'string',
            options:{
                list:[
                    {title: 'Select Account Type', value: ''},
                    {title: 'Sales Person', value: 'seller'},
                    {title: 'Laborrer', value: 'laborrer'},
                    {title: 'Customer', value: 'customer'}
                ]
            }
        }),
        defineField({
            name: 'email',
            type: 'email',
        }),
        defineField({
            name: 'password',
            type: 'string',
        }),
    ],

})