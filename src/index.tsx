import React from 'react';

import { parse } from 'node-html-parser';
import { Component } from './types';

type Props = {
  componentData: Component;
  components: Record<string, React.ElementType>;
};

export const VALID_HTML_ELEMENTS = [
  'div',
  'section',
  'nav',
  'ul',
  'article',
  'main',
];

const ElementComponent: React.FC<Props> = ({ componentData, components }) =>
  React.createElement(
    componentData.type,
    {
      ...componentData.attributes,
      ...componentData.styles,
    },
    <>
      {componentData.value && componentData.value}
      {componentData.children &&
        componentData.children.map(child => (
          <Empower
            key={child.id}
            components={components}
            componentData={child}
          />
        ))}
    </>
  );

const getComponent = ({ componentData, components }: Props) => {
  const isElement = VALID_HTML_ELEMENTS.includes(componentData.type);

  const provided = Object.keys(components).find(
    component => component.toLowerCase() === componentData.type.toLowerCase()
  );

  const ProvidedComponent = components[provided as keyof typeof components];

  if (isElement) {
    return (
      <ElementComponent componentData={componentData} components={components} />
    );
  } else if (ProvidedComponent) {
    return (
      <ProvidedComponent
        {...componentData.attributes}
        {...componentData.styles}
      >
        {componentData.value}
        {componentData.children &&
          Array.isArray(componentData.children) &&
          componentData.children.map(child => (
            <Empower
              key={child.id}
              componentData={child}
              components={components}
            />
          ))}
      </ProvidedComponent>
    );
  }

  return <>{componentData.value && parse(componentData.value)}</>;
};

const composeComponent = (props: Props): JSX.Element => {
  return getComponent(props);
};

function Empower(props: Props): JSX.Element {
  const ComposedComponent = composeComponent(props);
  return <>{ComposedComponent}</>;
}

export * from './types';

export default React.memo(Empower);
