# Hirosaji's illustratiton portfolio

My portfolio as illustrator work

## Content Page

<a href="https://hirosaji-portfolio.com/"><img src="./public/img/OGimg.jpg" width="500px"></a>
<p>https://hirosaji-portfolio.com/</p>

## Development

### Setup

```
npm install
```

### Local Run

You can run code on your local machine by:

```
npm run server
```

### Minify image

I'm using the [Google Pagespeed Insights](https://developers.google.com/speed/docs/insights/OptimizeImages) image optimization guidelines, and for ImageMagick they recommend the following:

- sampling-factor 4:2:0
- strip
- quality 85 [it can vary, I use range 60-80, lower number here means smaller file]
- interlace
- colorspace RGB

Command in ImageMagick:

```
convert image.jpg -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB image_converted.jpg
```

## License
ISC license

Copyright (c) 2020 Hirosaji
