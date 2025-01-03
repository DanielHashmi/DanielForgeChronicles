export const blog_post_query = (slug: string) => {
    return `*[_type == 'blogpost' && slug.current == '${slug}']{
  title,
  name,
  'slug':slug.current,
  description,
  author->{
    name,
    'slug':slug.current,
    image,
    bio
  },
  date,
  image,
  content{
    code,
    language,
  }
}[0]`
}

export const all_blogs_query = `*[_type == 'blogpost'] | order(date desc){
  title,
  name,
  'slug':slug.current,
  description,
  author->{
    name,
    'slug':slug.current,
    image,
    bio
  },
  date,
  image,
  content{
    code,
    language,
  }
}`

export const all_books_query = `*[_type == 'book'] | order(date desc){
  title,
  'slug':slug.current,
  date,
  image,
  author->{
    name,
    'slug':slug.current,
    bio,
    image
  },
  detail,
  buylink,
  description,
   'file':file.asset->{
    url,
    originalFilename
  },
}`