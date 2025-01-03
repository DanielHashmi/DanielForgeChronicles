import { ArrayRule, DateRule, defineType, ReferenceRule, SlugRule, StringRule } from 'sanity';
import { defineField } from 'sanity';

const bookSchema = defineType({
    name: 'book',
    type: 'document',
    title: 'Book',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            validation: (Rule: StringRule) => Rule.required().min(5).max(20)
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'title',
            },
            validation: (Rule: SlugRule) => Rule.required()
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
            validation: (Rule: StringRule) => Rule.required().min(20).max(500)
        }),
        defineField({
            name: 'author',
            type: 'reference',
            title: 'Author',
            to: [{ type: 'author' }],
            validation: (Rule: ReferenceRule) => Rule.required()
        }),
        defineField({
            name: 'date',
            type: 'date',
            title: 'Date',
            validation: (Rule: DateRule) => Rule.required()
        }),
        defineField({
            name: 'image',
            type: 'image',
            title: 'Image',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'detail',
            type: 'array',
            title: 'Detail',
            of: [{ type: 'block' }],
            validation: (Rule: ArrayRule<unknown>) => Rule.required()
        }),
        defineField({
            name: 'buylink',
            type: 'string',
            title: 'Buy Link',
        }),
        defineField({
            name: 'file',
            type: 'file',
            title: 'File',
            options: {
                accept: 'application/pdf',
            },
        })
    ]
});

export default bookSchema;