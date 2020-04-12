There's no such thing as a one-size-fits-all component library and you'll notice `Components` isn't a package you can depend on.

`Components` is intended to act as a framework which you can use and modify to meet the requirements of your project.

* Minimal CSS
* SSR compatible (server-side rendering)
* Accessible

## Common Dependencies

* [react](https://reactjs.org)
* [styled-components](https://www.styled-components.com)
* [lodash](https://lodash.com)

## Table of Contents

* [CSS Reset](#css-reset)
* [Heading](#heading)
* [Section](#section)
* [Box](#box)
* [Grid](#grid)
* [Visually Hidden](#visually-hidden)
* [Conditional Wrap](#conditional-wrap)
* [Portal](#portal)
* [Modal Dialog](#modal-dialog)
* [Spacer](#spacer)
* [Button](#button)

## Useful Accessibility Resources

* https://www.w3.org/TR/wai-aria-1.1
* https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples
* https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/landmarks
* https://inclusive-components.design

## CSS Reset

* Extension of https://hankchizljaw.com/wrote/a-modern-css-reset
* Reset all heading tags to separate semantic and aesthetic concerns
* Set `min-height` on `:root` and `body` to make it easier to position a footer at the bottom of the page
* Avoid anchor and button styling when a class has been applied, allowing them to be used interchangeably

## Heading

* [Managing Heading Levels In Design Systems](https://medium.com/@Heydon/managing-heading-levels-in-design-systems-18be9a746fa3)

### Usage

```JSX
<H>Level 2</H>
<H>Sibling Level 2</H>
<Section>
  <H>Level 3</H>
</Section>
```

## Section

Increments the heading level context value — see [Heading](#heading).

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

### Dependencies

* [antd/grid](https://ant.design/components/grid)

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
|-----------|-----------|----------------------------------------------------------------------------------------|
| condition | Bool!     | The condition to pass for `children` to be wrapped                                     |
| wrap      | Fn!       | Render prop with `children` as the only argument. Invoked when the `condition` is true |

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

## Modal Dialog

A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.

Dialogs are purposefully interruptive, so they should be used sparingly.

### Usage

```JSX
const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        Open Modal
      </Button>

      <Modal
        id="modal-1"
        title="Modal Title"
        show={showModal}
        actions={[
          { fragment: <Button>Cancel</Button> },
          { fragment: <Button>OK</Button>, autoFocus: true },
        ]}
        onClose={() => setShowModal(false)}
      >
        Modal content goes here!
      </Modal>
    </>
  );
}
```

### API

| Prop      | PropType         | Description
|-----------|------------------|--------------------------------------------------------------------|
| id        | String!          | GUID, not randomly generated to ensure it matches SSR              |
| title     | String\|Element! | Modal title                                                        |
| onClose   | Fn!              | Confirm and cancel callback                                        |
| actions   | [Action]!        | Collection of actions to render. Must contain one "confirm" action |
| show      | Bool             | Determines if the modal is visible                                 |

#### Action API

| Prop      | PropType | Description
|-----------|----------|----------------------------------------------------------------------------|
| fragment  | Element! | The button element to render                                               |
| autoFocus | Bool     | Auto focuses the action upon opening the modal. See "Managing Focus" below |

### Accessibility

ARIA 1.1 introduces `aria-modal="true"` — once this is well supported, we should drop the custom inert handling.

#### Managing focus

Most of the focus management happens automagically however, you should be familiar with the following:

* Dialogs should always have at least one focusable control. For many dialogs, there will be a button like "Close", "OK" or "Cancel". In addition to the needed control, dialogs can contain any number of focusable elements, even entire forms or other container widgets like tabs.
* When the dialog appears on the screen, keyboard focus (whose control depends upon the dialogs purpose) should be moved to the default focusable control inside the dialog. For dialogs that only provide a basic message, it could be an "OK" button. For dialogs containing a form it could be the first field in the form.

Extracted from https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role#Focus_management

#### Further Reading

* https://www.w3.org/TR/wai-aria-1.1/#aria-modal
* https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/dialog-modal/dialog.html
* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role

### Dependencies

* [inert](https://github.com/WICG/inert) — Similar to setting `aria-hidden="true"` but takes care of disabling each element from both mouse and keyboard interactions.
* [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)
* [Portal](#portal)
* [Heading](#heading)

## Spacer

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