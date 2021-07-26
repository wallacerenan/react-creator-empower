# React-Creator-Empower

React component that allows rendering of a component tree using a given data structure and components passed as props.

## Component data structure

The components should follow a predetermined data structure. This is as follows:

```ts
type Component = {
  id: string;
  type: string;
  value?: string;
  children?: Component[];
  attributes?: Attributes;
  styles?: {
    [key: string]: unknown;
  };
};

type Attributes = {
  [key: string]: unknown;
};
```

Example:

```json
{
  "id": "1",
  "type": "box",
  "children": [
    {
      "id": "1.1",
      "type": "box",
      "children": [
        {
          "id": "1.1.1",
          "type": "typography",
          "value": "Empower content creators",
          "attributes": {
            "variant": "h1",
            "className": "m-10 pink",
          },
        },
        {
          "id": "1.1.2",
          "type": "typography",
          "value": "greater power for content creation",
          "attributes": {
            "variant": "body1",
          },
        },
      ],
    },
    {
      "id": "2",
      "type": "Button",
      "value": "Empower",
    },
  ],
};
```

## Usage

Having the structure that defines how components can be used, you can pass a set of components on an object to Empower component.

```tsx
import Empower, { Component } from "react-creator-empower";

import { Box, Button, Typography } from "your-components-folder";

const components = {
  Box,
  Button,
  Typography,
};

export default function Home() {
  return <Empower componentData={componentsData} components={components} />;
}
```


