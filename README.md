## Dependencies

* [react](https://reactjs.org)
* [styled-components](https://www.styled-components.com)
* [lodash](https://lodash.com)
* [antd/grid](https://ant.design/components/grid)

## Index

* [CSS Reset](#css-reset)
* [Box](#box)
* [Grid](#grid)
* [Media](#media)
* [Visually Hidden](#visually-hidden)
* [Conditional Wrap](#conditional-wrap)
* [Portal](#portal)
* [Vertical Spacing](#vertical-spacing)
* [Button](#button)

## CSS Reset

* Extension of https://hankchizljaw.com/wrote/a-modern-css-reset
* Reset all heading tags to separate semantic and aesthetic concerns
* Set `min-height` on `:root` and `body` to make it easier to position a footer at the bottom of the page
* Avoid anchor and button styling when a class has been applied, allowing them to be used interchangeably

## Box

Many component libraries include a Box layout component, for example, [Rebass](https://rebassjs.org/box).

This abstraction avoids having to create lots of component wrappers which only serve the purpose of applying basic styles.

Consequently, code readability should be improved since a developer isn't required to scroll between JSX and styled component definitions to how the two fit together.

* Heavily influenced by [react-styled-box](https://github.com/Monar/react-styled-box)

### Usage

```JSX
<Box
  d="flex"
  b="2px solid"
  p={10}
>Content here!</Box>
```

### API

| Prop           | PropType                                                                          | Description
|----------------|-----------------------------------------------------------------------------------|------------
| d              | "block"\|"inline-block"\|"inline"\|"flex"\|"inline-flex"                          | CSS `display`
| m              | Number\|String                                                                    | CSS `margin`
| p              | Number\|String                                                                    | CSS `padding`
| w              | Number\|String                                                                    | CSS `width`
| h              | Number\|String                                                                    | CSS `height`
| b              | Number\|String                                                                    | CSS `border`
| color          | String                                                                            | CSS `background-colour`
| maxWidth       | Number\|String                                                                    | CSS `max-width`
| minWidth       | Number\|String                                                                    | CSS `min-width`
| maxHeight      | Number\|String                                                                    | CSS `max-height`
| minHeight      | Number\|String                                                                    | CSS `min-height`
| flexDirection  | "row"\|"row-reverse"\|"column"\|"column-reverse"                                  | CSS `flex direction`
| flexWrap       | "nowrap"\|"wrap"\|"wrap-reverse"                                                  | CSS `flex wrap`
| justifyContent | "flex-start"\|"flex-end"\|"center"\|"space-between"\|"space-around"\|"space-even" | CSS `justify-content`
| alignItems     | "flex-start"\|"flex-end"\|"center"\|"baseline"\|"stretch"                         | CSS `align-items`
| alignContent   | "flex-start"\|"flex-end"\|"center"\|"space-between"\|"space-around"\|"stretch"    | CSS `align-content`
| order          | Number                                                                            | CSS `order`
| flexGrow       | Number                                                                            | CSS `flex-grow`
| flexShrink     | Number                                                                            | CSS `flex-shrink`
| flexBasis      | Number\|String                                                                    | CSS `flex-basis`
| flex           | String                                                                            | CSS `flex`
| alignSelf      | "auto"\|"flex-start"\|"flex-end"\|"center"\|"baseline"\|"stretch"                 | CSS `align-self`
| overflow       | "visible"\|"hidden"\|"scroll"\|"auto"                                             | CSS `overflow`
| overflowX      | "visible"\|"hidden"\|"scroll"\|"auto"                                             | CSS `overflow-x`
| overflowY      | "visible"\|"hidden"\|"scroll"\|"auto"                                             | CSS `overflow-y`

\*Due to the frequency that `Box` is used, the most common props have been shorthanded.

## Grid

Acts as a proxy for [Ant Design Grid](https://ant.design/components/grid).

### Limitations

* The breakpoints of responsive grid follow [BootStrap 4 media queries rules](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)

### Usage

```JSX
<Row gutter={20}>
  <Col xs={24} md={12} lg={8}>
    Column A
  </Col>
  <Col xs={24} md={12} lg={8}>
    Column B
  </Col>
  <Col xs={24} md={12} lg={8}>
    Column C
  </Col>
</Row>
```

Ensure you render the exported `<GridStyles />` into your application.

## Media

Like [Grid](#grid), `Media` is another layout component but handles the scenarios where you don't simply need to rearrange content but actually render different content or components based on the size of the viewport.

### Limitations

* The breakpoints should be hardcoded to match the [Grid](#grid).

### Usage

Take the following hypothetical example where on desktop we have a stack of cards but have choosen to instead render a carousel on mobile:

```JSX
<BreakpointProvider>
  <Media>
    {mq => mq.lt('md') ? (
      <Carousel />
    ) : (
      <CardList>
        <Card />
        <Card />
        <Card />
      </CardList>
    )}
  </Media>
</BreakpointProvider>
```

### API

| Prop     | PropType | Description                                                                 |
|----------|----------|-----------------------------------------------------------------------------|
| children | Fn!      | Render prop with an instance of the `Breakpoint` class as the only argument |

#### Breakpoint Class

```js
const BREAKPOINTS = {
  xs: '@media screen and (max-width: 575px',
  sm: '@media screen and (min-width: 576px',
  md: '@media screen and (min-width: 768px',
  lg: '@media screen and (min-width: 992px',
  xl: '@media screen and (min-width: 1200px',
  xxl: '@media screen and (min-width: 1600px'
};
```

| Method   | Return Value     | Description
|----------|------------------|------------
| getIndex | BREAKPOINT_INDEX | Returns the current breakpoint index
| lt       | Bool             | `true` if the viewport is _less than_ the passed BREAKPOINT_INDEX
| gt       | Bool             | `true` if the viewport is _greater than_ the passed BREAKPOINT_INDEX
| lte      | Bool             | `true` if the viewport is _less than or equal to_ the passed BREAKPOINT_INDEX
| gte      | Bool             | `true` if the viewport is _greater than or equal to_ the passed BREAKPOINT_INDEX

\*BREAKPOINT_INDEX = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

## Visually Hidden

An accessibility helper for visually hiding content by ensuring it is still available for screen readers.

* https://alistapart.com/article/now-you-see-me

### Usage

```JSX
<fieldset>
  <legend>
    <VisuallyHidden children="Legend text here!" />
  </legend>
</fieldset>
```

## Conditional Wrap

`ConditionalWrap` is an abstraction which makes it simple to conditionally wrap content, whilst avoiding a duplicated definition of the content.

### Usage

In this scenario the content would be wrapped inside a modal, but only for mobile devices.

```JSX
<ConditionalWrap
  condition={isMobile}
  wrap={children => <Modal>{children}</Modal>}
  children={
    <p>Content here!</p>
  }
/>
```

### API

| Prop      | PropType  | Description
|-----------|-----------|-----------------------------------------------------------------------------------------|
| condition | Bool!     | The condition to pass for `children` to be wrapped.                                     |
| wrap      | Fn!       | Render prop with `children` as the only argument. Invoked when the `condition` is true. |

## Portal

Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

* https://reactjs.org/docs/portals.html
* [Next.js](https://nextjs.org) compatible

### Usage

```JSX
const showContent = React.useState(false);

<Portal>
  {showContent && (
    <p>Content here!</p>
  )}
</Portal>
```

### API

| Prop      | PropType | Description
|-----------|----------|-------------------------------------------------|
| selector  | String   | Selector to determine where to mount the Portal |

## Vertical Spacing

* [Handling spacing in a UI component library](https://medium.com/fed-or-dead/handling-spacing-in-a-ui-component-library-70f3b22ec89)

## Button

By default, an HTML `button` has an implicit `type` of `submit`. Here we override that default to be `button`, since this is more common and often otherwise forgotten.

### Usage

```JSX
<Button onClick={Function.prototype}>Call to action!</Button>
```

Styled components also ships with the [as](https://www.styled-components.com/docs/api#as-polymorphic-prop) prop which in this case, for example, can allow you to render the component as a hyperlink instead of a button, whilst maintaining the button styles:

```JSX
<Button as="a" href="/">Go to page!</Button>
```

### API

| Prop    | PropType | Default  | Description
|---------|----------|----------|--------------------------------|
| type    | String   | "button" | HTML `button` `type` attribute |