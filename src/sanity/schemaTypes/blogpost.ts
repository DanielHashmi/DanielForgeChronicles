import { defineField, DateRule, defineType, ObjectRule, ReferenceRule, SlugRule, StringRule, TextRule } from 'sanity';
const blogpostSchema = defineType({
    name: 'blogpost',
    type: 'document',
    title: 'Blog Post',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            validation: (Rule: StringRule) => Rule.required().min(10).max(40)
        }),
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name',
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
            validation: (Rule: TextRule) => Rule.required().min(20).max(500)
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
            name: 'content',
            title: 'Content',
            type: 'code',
            options: {
                language: 'typescript',
            },
            validation: (Rule: ObjectRule) => Rule.required(),
        }),
    ]
});

export default blogpostSchema;