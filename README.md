# react-horizontal-bar-graphs

![Static Badge](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react)
<!-- [![Static Badge](https://img.shields.io/badge/demo-react--device--mockup-blue?style=for-the-badge&logo=createreactapp)](https://jung-youngmin.github.io/react-device-mockup-demo/) -->

<!-- [![GitHub Tag](https://img.shields.io/github/v/tag/jung-youngmin/react-device-mockup?include_prereleases&style=for-the-badge&logo=github)](https://github.com/jung-youngmin/react-device-mockup)
[![NPM Version](https://img.shields.io/npm/v/react-device-mockup?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/react-device-mockup)
[![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/react-device-mockup?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/react-device-mockup) -->

[![Static Badge](https://img.shields.io/badge/repo-Github-black?style=for-the-badge&logo=github)](https://github.com/jung-youngmin/react-horizontal-bar-graphs)
![GitHub top language](https://img.shields.io/github/languages/top/jung-youngmin/react-horizontal-bar-graphs?style=for-the-badge&logo=Typescript)
![GitHub License](https://img.shields.io/github/license/jung-youngmin/react-horizontal-bar-graphs?style=for-the-badge&logo=github)

<!-- You can check out the
[🌐 full-demo-here](https://jung-youngmin.github.io/react-device-mockup-demo/)   -->
Package for **React Native** is [🌐 here](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs)

## Index

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [How to use](#how-to-use)
4. [Props](#props)
5. [Demo](#demo)
6. [License](#license)

## Introduction

`react-horizontal-bar-graphs` allows you to easily draw horizontal bar graphs.  
In a mobile environment, there is limited screen space for using vertical graphs.

`react-native-horizontal-bar-graphs` provides two types of horizontal-graphs.  
For both graphs, you can draw the graph by passing **only 1 or 2 required props.**  
You can also customize it by passing other additional(optional) props.

### 1. BarGraph

![samp_bar_no_anim](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/e64a56aa-11e2-476e-b41e-a270e3d7ca1c)
![samp_bar_anim](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/6fb297d7-79db-413a-9492-064406893fa7)

It is a typical bar graph.  
One data is rendered as one bar.  
Each bar can display a label, value, or percentage.  
You should pass **1 required prop.**

### 2. StackedBar

![samp_stack_no_anim](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/e2dedf31-a1bc-413a-9724-999262c6db83)
![samp_stack_anim](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/be58add5-234d-4108-9793-7f280558c5bf)

Data is stacked and rendered in one bar.  
Information about each data is displayed as a list at the bottom of the bar.  
You should pass **2 required props.**

## Installation

No dependencies. Just install it

``` bash
npm install react-native-horizontal-bar-graphs
```

or if you use yarn

``` bash
yarn add react-native-horizontal-bar-graphs
```

## How to use

```tsx
import {BarGraph, IBarGraphData, StackedBar} from 'react-native-horizontal-bar-graphs';

const BAR_DATA: IBarGraphData[] = [
    {
        value: 10,
        label: 'Label 0',
        onPress: (label, value, color) => {
            // your onPresss
        },
    },
    {
        value: 9,
        label: 'Label 1',
    },
    {
        value: 16,
        label: 'Label 2',
    }
    ];

// in your component
<BarGraph
    graphData={BAR_DATA}
    // optional props...
/>

<StackedBar
    graphData={BAR_DATA}
    totalCnt={100}
    // optional props...
/>
```

## Props

### IBarGraphData

Basic data of graphs.  
Used in both `<BarGraph/>` and `<StackedBar/>`

| prop    | Required | Type             | Default           | Description         |
| -----   | :------: | ------------     | ----------------- | ------------------- |
| label   | O        | `string`         |                   | Label(name) of data |
| value   | O        | `number`         |                   | Number of data      |
| color   | X        | `Property.Color` | predefined colors | [🔗 color](#color-ibargraphdata) |
| onPress | X        | `function`       |                   | [🔗 onPress](#onpress-ibargraphdata) |

#### color (IBarGraphData)

Colors to be rendered to Bar.  
If you do not specify a color, the colors in `DEFAULT_COLORS` will be applied in a cycle. (modular operation)

> **DEFAULT_COLORS** are
>
> <span style="background-color:coral; color:white">`"coral"`</span>  
> <span style="background-color:cornflowerblue; color:white">`"cornflowerblue"`</span>  
> <span style="background-color:crimson; color:white">`"crimson"`</span>  
> <span style="background-color:darkcyan; color:white">`"darkcyan"`</span>  
> <span style="background-color:dodgerblue; color:white">`"dodgerblue"`</span>  
> <span style="background-color:orangered; color:white">`"orangered"`</span>  
> <span style="background-color:forestgreen; color:white">`"forestgreen"`</span>  
> <span style="background-color:goldenrod; color:white">`"goldenrod"`</span>  
> <span style="background-color:yellowgreen; color:white">`"yellowgreen"`</span>  
> <span style="background-color:darkviolet; color:white">`"darkviolet"`</span>  

**NOTE:** `DEFAULT_COLORS` were selected from the
[Named colors](https://reactnative.dev/docs/colors#named-colors) of React Native

[🔼 back to `IBarGraphData`](#ibargraphdata)

<br>

#### onPress (IBarGraphData)

``` ts
onPress?: (
  label: string,
  value: number,
  color: Property.Color,
) => void | Promise<void>;
```

A function that runs when the user touches or clicks the bar.  
`label`, `value`, and `color` are provided as parameters.

**NOTE:** In `BarGraph`, it is triggered when the bar is touched  
**NOTE:** In `StackedBar`, it is triggered when an item in the list is touched.

[🔼 back to `IBarGraphData`](#ibargraphdata)

---

<br>

### BarGraph

only 1 required prop

| prop                  | Required | Type                      | Default       | Related |
| --------------------- | :------: | ------------------------- | ------------- | ----------- |
| graphData             | O        | `IBarGraphData[]`         |               | [🔗 IBarGraphData](#ibargraphdata)<br>[🔗 graphData](#graphdata) |
| totalCnt              | X        | `number`                  | sum of `graphData[0...n].value` | [🔗 totalCnt](#totalcnt) |
| style                 | X        | `CSSProperties`           | default style | [🔗 style](#style-bargraph) |
| className             | X        | `string`                  |               | Class name for graph containers |
| title                 | X        | `string`                  |               | [🔗 title & titleStyle](#title--titlestyle-bargraph) |
| titleStyle            | X        | `CSSProperties`           | default style | [🔗 title & titleStyle](#title--titlestyle-bargraph) |
| titlePosition         | X        | `"top"`<br>`"bottom"`     | `"top"`       | Position of the title |
| barHeight             | X        | `number`                  | `28`          | Height of each bar |
| barHolderColor        | X        | `Property.Color`          | `"#EEEEEE"`   | Placeholder color for bars |
| barDistance           | X        | `number`                  | `12`          | Distance between bars<br>[barDistance (BarGraph only)](#bardistance-bargraph-only) |
| barAnimated           | X        | `boolean`                 | `true`        | Whether to animate the bar |
| barAnimateDelay       | X        | `number`                  | `60`          | Delay time (ms) at which the animation of the bars begins |
| barLeftStyle          | X        | `"rounded"`<br>`"square"` | `"rounded"`   | Left style of bar (both colored and holder).<br>[barLeftStyle](#barleftstyle-barrightstyle-barholderrightstyle) |
| barRightStyle         | X        | `"rounded"`<br>`"square"` | `"rounded"`   | Right style of colored bar.<br>[barRightStyle](#barleftstyle-barrightstyle-barholderrightstyle) |
| barHolderRightStyle   | X        | `"rounded"`<br>`"square"` | `"rounded"`   | Right style of placeholder of bar.<br>[barHolderRightStyle](#barleftstyle-barrightstyle-barholderrightstyle) |
| showLabel             | X        | `boolean`                 | `true`        | Whether to show each label of graphData |
| labelPosition         | X        | `"top"`<br>`"bottom"`     | `"top"`       | Position of each label relative to the bar |
| labelStlye            | X        | `CSSProperties`           | default style | Styles for label<br>[🔗 details](#labelstlye-bargraph) |
| showValue             | X        | `boolean`                 | `true`        | Whether to show the value above the bar |
| valuePosition         | X        | `"left"`<br>`"right"`     | `"right"`     | Position on the bar where the value is rendered<br>[valuePosition (BarGraph only)](#valueposition-bargraph-only) |
| valueSuffixCnt        | X        | `number`                  | `1000`        | Number to attach suffix when `value` exceeds `valueSuffixCnt`<br>[🔗 details](#valuesuffixcnt--valuesuffixlist-bargraph-only) |
| valueSuffixList       | X        | `string[]`                | `["k", "m", "b", "t"]` | List of suffix attached to `value` after dividing `value` by `valueSuffixCnt`<br>[🔗 details](#valuesuffixcnt--valuesuffixlist-bargraph-only) |
| showDivider           | X        | `boolean`                 | `true`        | Whether to display a divider at certain percentages in the bar's placeholder |
| dividerInterver       | X        | `4`, `5`, `10`, `20`, `25`, `33.3`, `50` | `20` | A number for what percentage of intervals the dividing lines are rendered.<br>*e.g.* If set to `20`, dividers will be rendered at `20%`, `40%`, `60%`, and `80%`. |
| dividerHeight         | X        | `number`                  | `60`          | Height of divider (percent).<br>When set to `100`, it is equal to the height of the bar |
| dividerColor          | X        | `Property.Color`          | `"#BBBBBB"`   | Color of divider |
| dividerWidth          | X        | `number`                  | `1`           | Width of each divider |
| percentPosition       | X        | `"left"`<br>`"right"`<br>`"none"` | `"right"` | Position where the percentage corresponding to value is displayed.<br>**NOTE:** When `undefined` or `"none"`, it is not rendered. |
| percentFixed          | X        | `0`, `1`, `2`             | `0`           | A number representing the decimal place of a percentage to be rendered<br>[🔗 details](#percentfixed-bargraph) |
| PercentLabelComponent | X        | `({ value, total, color }: { value: number; total: number, color: ColorValue \| undefined }) => ReactElement \| null \| undefined` | | A React Component to display percentages.<br>[PercentLabelComponent](#percentlabelcomponent) |
| enableTouchHighlight  | X        | `boolean`                 | `true`        | Whether to enable color highlighting when a bar or list item is touched.<br>[enableTouchHighlight](#enabletouchhighlight) |

<br>

#### graphData

Data to be rendered

> **Required**: ⭕  
> **Type**: [`IBarGraphData[]`](#ibargraphdata)

[🔼 back to `BarGraph`](#bargraph)

<br>

#### totalCnt

Total number of data.  
Used as denominator when calculating percentages.

> **Required**: ❌  
> **Type**: `number`  
> **Default**: sum of `graphData[0...n].value`

[🔼 back to `BarGraph`](#bargraph)

<br>

#### style (BarGraph)

Styles for graph containers

> **Required**: ❌  
> **Type**: `CSSProperties`  

``` js
// default style
{
  display: "flex",
  boxSizing: "border-box",
  flexDirection: "column",
  flex: 1,
  position: "relative",
  minWidth: 320,
}
```

[🔼 back to `BarGraph`](#bargraph)

<br>

#### title & titleStyle (BarGraph)

Title of graph.  
**NOTE:** If `title` is `undefined` or an empty string (`""`), it will not be rendered.

``` js
// default title style
{
  fontWeight: "bold",
  fontSize: 20,
  textAlign: "center",
  marginVertical: 16
}
```

[🔼 back to `BarGraph`](#bargraph)

<br>

#### labelStlye (BarGraph)

Styles for label.

``` js
{
  color: "#999999",
  fontSize: barHeight / 2
}
```

**NOTE:** By default, fontSize is set to `barHeight/2`.  
**NOTE:** When you touch the bar, the text color is highlighted in the same color as the bar.
If you don't want it, set `enableTouchHighlight` to `false`.

[🔼 back to `BarGraph`](#bargraph)

<br>

#### valueSuffixCnt & valueSuffixList (BarGraph only)

`valueSuffixCnt` & `valueSuffixList` are used for simplicity depending on the digits.

- `valueSuffixCnt` is a Number to attach suffix when `value` exceeds `valueSuffixCnt`.
- `valueSuffixList` is a List of suffix attached to `value` after dividing `value` by `valueSuffixCnt`

Suppose the `valueSuffixCnt` is `1000`, and the `valueSuffixList` is `["k", "m", "b", "t"]`.  
*e.g.1.* The number `1234` is expressed as `"1.2k"`. (up to the first decimal place)  
*e.g.2.* The number `20000000` is expressed by `"20m"`.

**NOTE:** `valueSuffixCnt` <= 0 means No Suffix.  
*e.g.1.* The number `1234` is expressed as `"1,234"`.  
*e.g.2.* The number `20000000` is expressed by `"20,000,000"`.

[🔼 back to `BarGraph`](#bargraph)

<br>

#### percentFixed (BarGraph)

A number representing the decimal place of a percentage to be rendered.

*e.g.1* Rendered to `50%` when set to `0`  
*e.g.2* Rendered to `50.0%` when set to `1`  
*e.g.3* Rendered to `50.00%` when set to `2`

**NOTE:** this prop is ignored when `PercentLabelComponent` is passed

[🔼 back to `BarGraph`](#bargraph)

<br>

### StackedBar

2 required props. Shares many items with props from `BarGraph`

| prop                  | Required | Type | Default | Description |
| --------------------- | :-------:| ---- | ------- | ----------- |
| graphData             | O        | `IBarGraphData` |  | Data to be rendered<br>[🔗 details](#ibargraphdata) |
| totalCnt              | O        | `number` |  | Total number of data.<br>Used as denominator when calculating percentages.<br>데이터의 전체 갯수.<br>퍼센트를 계산할 때 분모로 사용됨. |
| style                 | X        | `StyleProp<ViewStyle>` |  | Styles for graph containers |
| title                 | X        | `string` |  | Title of graph<br>**NOTE:** If title is `undefined` or an empty string (`""`), it will not be rendered. |
| titlePosition         | X        | `"top" \| "bottom"` | `"top"` | Position of the title |
| titleStyle            | X        | `StyleProp<TextStyle>` | `{fontWeight: "bold", fontSize: 20, textAlign: "center", marginVertical: 16}` | Styles for title |
| barHeight             | X        | `number` | `28` | Height of each bar |
| barHolderColor        | X        | `ColorValue` | `"#EEEEEE"` | Placeholder color for bars |
| barAnimated           | X        | `boolean` | `true` | Whether to animate the bar |
| barLeftStyle          | X        | `"rounded" \| "square"` | `"rounded"` | Left style of bar (both colored and holder).<br>[barLeftStyle](#barleftstyle-barrightstyle-barholderrightstyle) |
| barRightStyle         | X        | `"rounded" \| "square"` | `"rounded"` | Right style of colored bar.<br>[barRightStyle](#barleftstyle-barrightstyle-barholderrightstyle) |
| barHolderRightStyle   | X        | `"rounded" \| "square"` | `"rounded"` | Right style of placeholder of bar.<br>[barHolderRightStyle](#barleftstyle-barrightstyle-barholderrightstyle) |
| showDivider           | X        | `boolean` | `true` | Whether to display a divider at certain percentages in the bar's placeholder |
| dividerInterver       | X        | `4 \| 5 \| 10 \| 20 \| 25 \| 33.3 \| 50` | `20` | A number for what percentage of intervals the dividing lines are rendered<br>*e.g.* If set to `20`, dividers will be rendered at `20%`, `40%`, `60%`, and `80%`.<br>divider가 몇%마다 표시될지 |
| dividerHeight         | X        | `string \| number` | `"60%"` | Height of divider<br>When set to "100%", it is equal to the height of the bar |
| dividerColor          | X        | `ColorValue` | `"#BBBBBB"` | Color of divider |
| dividerWidth          | X        | `number` | `1` | Width of each divider |
| percentPosition       | X        | `"left" \| "right" \| "none"` | `"right"` | Position where the percentage corresponding to value is displayed.<br>**NOTE:** If it is `undefined` or `"none"`, it is not rendered. |
| percentFixed          | X        | `0 \| 1 \| 2` | `0` | A number representing the decimal place of a percentage to be rendered.<br>*e.g.1* Rendered to `50%` when set to `0`<br>*e.g.2* Rendered to `50.0%` when set to `1`<br>*e.g.3* Rendered to `50.00%` when set to `2`<br>**NOTE:** this prop is ignored when `PercentLabelComponent` is passed<br>퍼센트의 소수점 몇번째 자리까지 표시할지 |
| PercentLabelComponent | X        | `({ value, total, color }: { value: number; total: number, color: ColorValue \| undefined }) => ReactElement \| null \| undefined` | | A React Component to display percentages.<br>[PercentLabelComponent](#percentlabelcomponent) |
| enableTouchHighlight  | X        | `boolean` | `true` | Whether to enable color highlighting when a bar or list item is touched.<br>[enableTouchHighlight](#enabletouchhighlight) |
| showList              | X        | `boolean` | `true` | Whether to render a list of `graphData` |
| listAnimated          | X        | `boolean` | `true` | Whether to run animations when the list is displayed |
| listContainerStyle    | X        | `StyleProp<ViewStyle>` |  | Style of list container |
| ListItemComponent     | X        | `(props: IStackedCustomListItemProps) => ReactElement` |  | A React Component that renders custom list items.<br>[ListItemComponent (StackedBar Only)](#listitemcomponent-stackedbar-only) |

## Demo

### barLeftStyle, barRightStyle, barHolderRightStyle

***Rounded - Default***
| BarGraph | StackedBar |
| :--: | :--: |
| ![bar_percent_default](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/43945c20-e5e6-4a6b-9461-cf9aa68e24e1) | ![stacked_rrr](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/a4d97266-e53a-49a2-9249-06b5c825dd67) |

``` tsx
<BarGraph // same as StackedBar
  graphData={BAR_DATA}
  barLeftStyle="rounded"
  barRightStyle="rounded"
  barHolderRightStyle="rounded"
  // other props...
/>
```

<br>

***Square***
| BarGraph | StackedBar |
| :--: | :--: |
| ![bar_sss](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/4dceed33-460a-4cff-841a-2d025f2bec3e) | ![stack_sss](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/0a19eb59-c282-4f63-88fd-83813463d65a) |

``` tsx
<BarGraph // same as StackedBar
  graphData={BAR_DATA}
  barLeftStyle="square"
  barRightStyle="square"
  barHolderRightStyle="square"
  // other props...
/>
```

<br>

***Mixed style 1***
| BarGraph | StackedBar |
| :--: | :--: |
|![bar_rsr](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/da2b2f93-f434-41ea-918e-302dde8d875f) | ![stack_rsr](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/71858464-e050-4b70-ad96-acf6a6b375ac) |

``` tsx
<BarGraph // same as StackedBar
  graphData={BAR_DATA}
  barLeftStyle="rounded"
  barRightStyle="square"
  barHolderRightStyle="rounded"
  // other props...
/>
```

<br>

***Mixed style 2***
| BarGraph | StackedBar |
| :--: | :--: |
| ![bar_srr](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/d33e7293-5395-47c1-8d0f-d9ae743aeb0c) | ![stack_srr](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/6c9ef94b-379b-44da-9e4d-233823302538) |

``` tsx
<BarGraph // same as StackedBar
  graphData={BAR_DATA}
  barLeftStyle="square"
  barRightStyle="rounded"
  barHolderRightStyle="rounded"
  // other props...
/>
```

<br>

### PercentLabelComponent

recommend using `fixed-width` styles.  
`value`, `total`, and `color` are provided to calculate the percentage.  
**NOTE:** Color may be passed `undefined`.  
**NOTE:** Only the `PercentLabelComponent` that will be rendered
on the right or left sides of the `StackedBar` has an `undefined` color.  
**NOTE:** The color of `BarGraph.PercentLabelComponent` is **not** `undefined`  
> **NOTE:** color는 `undefined`로 전달될 수 있습니다.  
> **NOTE:** `StackedBar의` 오른쪽이나 왼쪽에 렌더될
> `PercentLabelComponent`만 color가 `undefined`입니다.  
> **NOTE:** `BarGraph.PercentLabelComponent`의 color는 `undefined`가 **아닙니다**

| BarGraph | StackedBar |
| :--: | :--: |
| *default*<br>![bar_percent_default](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/43945c20-e5e6-4a6b-9461-cf9aa68e24e1) | *default*<br>![stack_percent_default](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/b8a05d95-8cf6-4ae7-8970-95dfc0617d6e) |
| *custom*<br>![bar_percent_custom](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/d58de523-a297-4163-aa9e-a5c66358ba19) | *custom*<br>![stack_percent_custom](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/7955f6da-f84f-4e60-8274-0600aa4ee95f) |

```tsx
<BarGraph // same as StackedBar
  graphData={BAR_DATA}
  style={[styles.graphContainer]}
  PercentLabelComponent={({value, total, color}) => {
    return (
      <Text
        style={{
          width: 70, // recommended to use `fixed width styles`
          fontSize: 16,
          textAlign: 'right',
          fontWeight: 'bold',
          color: color,
          fontStyle: 'italic',
          textDecorationLine: 'underline',
        }}>
        {((value / total) * 100).toFixed(1) + '%'}
      </Text>
    );
  }}
/>
```

<br>

### enableTouchHighlight

If you don't want this effect, set `enableTouchHighlight` to `false`.
(default is `true`)

| BarGraph | StackedBar |
| :--: | :--: |
| ![bar_highlight](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/92d05060-47d1-4ce4-9e25-3a3389dda806) | ![stack_highlight](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/13804cd0-01fc-494f-8432-ade7bb2bf777) |

<br>

### barDistance (BarGraph only)

| Default | barDistance={24} |
| :--: | :--: |
| ![bar_distance](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/f69747ec-9445-4fdb-b6fb-becec7247b0c) | ![bar_distance_24](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/59d6fe5f-f108-4437-b1c2-4c28b023303c) |

```tsx
<BarGraph
  graphData={BAR_DATA}
  barDistance={24} // default : 12
  // other props...
/>
```

<br>

### valuePosition (BarGraph only)

| Default | valuePosition="left" |
| :--: | :--: |
| ![bar_val_right](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/7e2572cc-2f7e-4d43-970b-a3914db1d34f) | ![bar_val_left](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/7a4015d6-b221-4c30-9a39-9fad55450862) |

```tsx
<BarGraph
  graphData={BAR_DATA}
  style={[styles.graphContainer]}
  valuePosition="left" // default: "right"
  // other props...
/>
```

<br>

### ListItemComponent (StackedBar Only)

If you want to use your own custom list items, use this `ListItemComponent`.  
For performance, I **strongly recommend** wrapping your custom component with **`React.memo()`**
| Default | Custom ListItem | Custom ListItem |
| :--: | :--: | :--: |
| ![stack_list_dd](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/b4c152fc-5399-4a84-a282-91e5419c7504) | ![stack_list_cd](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/07d5198e-03ff-4745-9210-f17bc849f6ba) | ![stack_list_cc](https://github.com/jung-youngmin/react-native-horizontal-bar-graphs/assets/166787291/8b5a3db7-5b02-40a7-bc85-bbeb5dca0534) |
| *defalut PercentLabelComponent* | *defalut PercentLabelComponent* | *custom PercentLabelComponent* |

<br>

The following `props` of `ListItemComponent` are passed:

```tsx
export interface IStackedCustomListItemProps {
 readonly label: string;
 readonly value: number;
 readonly color: ColorValue;
 readonly index: number;
 readonly totalCnt: number;
 readonly onTouching: (index: number, isTouched: boolean) => void;
 readonly PercentLabelComponent: PercentLabelComp;
}
```

<br>

***onTouching***  
If you want to use the same color highlight effect as when using
[enableTouchHighlight](#enabletouchhighlight),  
implement `onPressIn()` and `onPressOut()` of your TouchableComponents
(such as `TouchableOpacity` or `TouchableHighlight`) using `props.onTouching()` as follows:

```tsx
<TouchableOpacity
 // To use `TouchHighlight`, implement `onPressIn` and `onPressOut` as follows:
 onPressIn={() => props.onTouching(props.index, true)}
 onPressOut={() => props.onTouching(props.index, false)}
 onPress={() => {}}>
 {...}
</TouchableOpacity>
```

<br>

***PercentLabelComponent***  
If you passed your `PercentLabelComponent` as the props of `StackedBar`,  
the same(your) `PercentLabelComponent` will be passed as the props of `ListItemComponent`.

If you did **NOT** pass a `PercentLabelComponent` as the props of `StackedBar`,  
the default `PercentLabelComponent` will be passed as the props of `ListItemComponent`.

<br>

***Full sample code of using `ListItemComponent`***

```tsx
const _ListItem = useCallback<StackedCustomListItem>(
  (listProps: IStackedCustomListItemProps) => {
    const {
      onTouching,
      index,
      label,
      totalCnt,
      value,
      color,
      PercentLabelComponent,
    } = listProps;
    return (
      <TouchableOpacity
        // To use `TouchHighlight`, implement `onPressIn` and `onPressOut` as follows:
        onPressIn={() => onTouching(index, true)}
        onPressOut={() => onTouching(index, false)}
        onPress={() => {}}>
        <View
          style={{
            marginVertical: 8,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: color}}>
            {label}
          </Text>
          <View
            style={{
              width: 70,
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'flex-end',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{value}</Text>
            <Text style={{fontSize: 12}}>{' / ' + totalCnt}</Text>
          </View>
          <PercentLabelComponent
            value={value}
            total={totalCnt}
            color={color}
          />
        </View>
      </TouchableOpacity>
    );
  },
  [],
);

// For performance,
// I strongly recommend wrapping your custom component with React.memo()
const ListItem = React.memo(_ListItem);

return (
 // return statement in your components
 // or return statement of render() in your components
 // ...
 <StackedBar
   graphData={BAR_DATA}
   totalCnt={dataTotalCnt + 30}
   style={styles.graphContainer}
   title="This is Title"
   PercentLabelComponent={({value, total, color}) => {
     return (
       <Text
         style={{
           width: 70,
           fontSize: 16,
           textAlign: 'right',
           fontWeight: 'bold',
           color: color,
           fontStyle: 'italic',
           textDecorationLine: 'underline',
         }}>
         {((value / total) * 100).toFixed(1) + '%'}
       </Text>
     );
   }}
   listContainerStyle={{marginTop: 16}}
   ListItemComponent={ListItem}
 />
);

```

## License

MIT license
