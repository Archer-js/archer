# Archer.js
The perfect framework for making web apps

You can make reusable components, HTML variables, and has way more features.

## Reusable Components

To make a component do this:

```javascript
  Archer.component("cool-button", {
    template: "<button>I'm cool!</button>",
  });
```

Then you can use it like this:
```html
  {{{cool-button}}}
```

### HTML Variables

To make a HTML Variable

```javascript
  Archer.data.add("hello", "hello world!")
```

Then you can use it like this:
```html
  {{hello}}
```

## License
This work is under the Apache License 2.0
