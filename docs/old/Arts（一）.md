<!-- ---
title:  Arts（一）
date: 2019/05/19
tags:	
	- 随笔
--- -->

#  Arts（一）

![](/img/bboc.png)

## Algorithm
[Add Two Numbers](https://github.com/unbrain/Arts/issues/1)、

# Review

[Virtual DOM is pure overhead](<https://svelte.dev/blog/virtual-dom-is-pure-overhead>)

# Virtual DOM is pure overhead

Let's retire the 'virtual DOM is fast' myth once and for all

虚拟DOM是纯粹的开销

让我们一劳永逸地退出“虚拟DOM是快的”的神话

<!--more-->

If you've used JavaScript frameworks in the last few years, you've probably heard the phrase 'the virtual DOM is fast', often said to mean that it's faster than the *real* DOM. It's a surprisingly resilient meme — for example people have asked how Svelte can be fast when it doesn't use a virtual DOM.

It's time to take a closer look.

如果在过去几年里使用过 Javascript 框架，那么你可能已经听过 “虚拟 DOM 是快速的” 这一说法了，通常被认为着他比真正的 DOM 更快。这是一种令人惊讶的 meme——例如人们会问为啥 Svelte（一种前端框架）能够快而不使用虚拟 DOM

## What is the virtual DOM?

In many frameworks, you build an app by creating `render()` functions, like this simple [React](https://reactjs.org/)component:

```javascript
function HelloMessage(props) {
  return (
    <div className="greeting">
      Hello {props.name}
    </div>
  );
}
```

You can do the same thing without JSX...

```javascript
function HelloMessage(props) {
  return React.createElement(
    'div',
    { className: 'greeting' },
    'Hello ',
    props.name
  );
}
```

...but the result is the same — an object representing how the page should now look. That object is the virtual DOM. Every time your app's state updates (for example when the `name` prop changes), you create a new one. The framework's job is to *reconcile* the new one against the old one, to figure out what changes are necessary and apply them to the real DOM.

## 什么是虚拟 DOM

在许多的框架，你可以使用 render() 函数来构建应用，比如简单的 react 组件

```javascript
function HelloMessage(props) {
  return (
    <div className="greeting">
      Hello {props.name}
    </div>
  );
}
```

你也可以不使用 JSX 达到目的

```javascript
function HelloMessage(props) {
  return React.createElement(
    'div',
    { className: 'greeting' },
    'Hello ',
    props.name
  );
}
```

但他们结果是一样的——是一个对象表示页面该如何去渲染。这个对象就是虚拟 DOM。每一次你页面状态进行更新（比如当 props 中的 name 发生改变），你都需要重新渲染。框架的工作就是找到新旧之间真正有必要去改变的地方并应用在真实 DOM 上。

## How did the meme start?

Misunderstood claims about virtual DOM performance date back to the launch of React. In [Rethinking Best Practices](https://www.youtube.com/watch?v=x7cQ3mrcKaY), a seminal 2013 talk by former React core team member Pete Hunt, we learned the following:

> This is actually extremely fast, primarily because most DOM operations tend to be slow. There's been a lot of performance work on the DOM, but most DOM operations tend to drop frames.

## meme 是如何开始的

对虚拟 DOM 的性能误解可以追溯到 React。 在 [Rethinking Best Practices](https://www.youtube.com/watch?v=x7cQ3mrcKaY) 中，前React核心团队成员Pete Hunt在2013年的开创性讲话中，我们学到了以下内容：

> 这实际上非常快，主要是因为大多数 DOM 操作往往很慢。DOM 上有很多性能工作，但大多数 DOM 操作都会丢帧。

But hang on a minute! The virtual DOM operations are *in addition to* the eventual operations on the real DOM. The only way it could be faster is if we were comparing it to a less efficient framework (there were plenty to go around back in 2013!), or arguing against a straw man — that the alternative is to do something no-one actually does:

```javascript
onEveryStateChange(() => {
  document.body.innerHTML = renderMyApp();
});
```

但是等一下！虚拟 DOM 操作是对真实 DOM 上的最终操作的补充。它可能更快的唯一方法是，如果我们将它与一个效率较低的框架进行比较（2013年还有很多这样的框架），或者反对一个稻草人 ——一种选择做一些没有人实际做的事情：

```javascript
onEveryStateChange(() => {
  document.body.innerHTML = renderMyApp();
});
```

Pete clarifies soon after...

> React is not magic. Just like you can drop into assembler with C and beat the C compiler, you can drop into raw DOM operations and DOM API calls and beat React if you wanted to. However, using C or Java or JavaScript is an order of magnitude performance improvement because you don't have to worry...about the specifics of the platform. With React you can build applications without even thinking about performance and the default state is fast.

...but that's not the part that stuck.

Pete 很快就澄清了

> React 并不神奇。就像你可以使用 C 进入汇编程序并击败 C 编译器一样，如果你愿意，你可以放入原始 DOM 操作和 DOM API 调用并击败 React。但是，使用 C 或 Java 或 JavaScript 是一个数量级的性能提升，因为您不必担心...框架的细节。使用 React，您甚至可以在不考虑性能的情况下构建应用程序，并且默认状态很快。

.....但那不是卡住的部分。

## So... is the virtual DOM *slow*?

Not exactly. It's more like 'the virtual DOM is usually fast enough', but with certain caveats.

The original promise of React was that you could re-render your entire app on every single state change without worrying about performance. In practice, I don't think that's turned out to be accurate. If it was, there'd be no need for optimisations like `shouldComponentUpdate` (which is a way of telling React when it can safely skip a component).

Even with `shouldComponentUpdate`, updating your entire app's virtual DOM in one go is a lot of work. A while back, the React team introduced something called React Fiber which allows the update to be broken into smaller chunks. This means (among other things) that updates don't block the main thread for long periods of time, though it doesn't reduce the total amount of work or the time an update takes.

## 所以，虚拟 DOM 是慢的？

不完全是。它更像是“虚拟DOM通常足够快”，但有一些注意事项。

React的最初承诺是，您可以在每次状态更改时重新呈现整个应用程序，而无需担心性能。在实践中，我认为这不是准确的。如果是的话，就不需要像 shouldComponentUpdate 这样的优化（这是一种告诉 React 什么时候可以安全跳过组件的方法）。

即使使用 shouldComponentUpdate，一次性更新整个应用程序的虚拟DOM也需要做很多工作。不久前，React 团队推出了一种叫做 React Fiber 的东西，它允许将更新分解成更小的块。这意味着（除其他外）更新不会长时间阻塞主线程，尽管它不会减少工作总量或更新所需的时间。

## Where does the overhead come from?

Most obviously, [diffing isn't free](https://twitter.com/pcwalton/status/1015694528857047040). You can't apply changes to the real DOM without first comparing the new virtual DOM with the previous snapshot. To take the earlier `HelloMessage` example, suppose the `name` prop changed from 'world' to 'everybody'.

1. Both snapshots contain a single element. In both cases it's a `<div>`, which means we can keep the same DOM node
2. We enumerate all the attributes on the old `<div>` and the new one to see if any need to be changed, added or removed. In both cases we have a single attribute — a `className`with a value of `"greeting"`
3. Descending into the element, we see that the text has changed, so we'll need to update the real DOM

Of these three steps, only the third has value in this case, since — as is the case in the vast majority of updates — the basic structure of the app is unchanged. It would be much more efficient if we could skip straight to step 3:

```javascript
if (changed.name) {
  text.data = name;
}
```

(This is almost exactly the update code that Svelte generates. Unlike traditional UI frameworks, Svelte is a compiler that knows at *build time* how things could change in your app, rather than waiting to do the work at *run time*.)

##  开销来自哪里？

最明显的是，[diffing isn't free](https://twitter.com/pcwalton/status/1015694528857047040)。如果不先将新虚拟 DOM与 之前的快照进行比较，则无法对真实DOM应用更改。要采用早期的 HelloMessage 示例，假设名称prop从 “world” 更改为 “everybody”。

1. 两个快照都包含一个元素。在这两种情况下，它都是 `<div>`，这意味着我们可以保持相同的 DOM 节点
2. 我们枚举旧 `<div>` 和新的属性上的所有属性，以查看是否需要更改，添加或删除任何属性。
3. 在这两种情况下，我们都有一个属性一个 className，其值为 “greeting” 下降到元素，我们看到文本已经改变，所以我们需要更新真正的 DOM

在这三个步骤中，只有第三个步骤在这种情况下具有价值，因为 - 绝大多数更新中的情况 - 应用程序的基本结构不变。如果我们可以直接跳到第3步，那将会更有效率。

这几乎就是 Svelte 生成的更新代码。与传统的UI框架不同，Svelte 是一个编译器，它在构建时知道应用程序中的内容如何变化，而不是等待在运行时进行工作。

## It's not just the diffing though

The diffing algorithms used by React and other virtual DOM frameworks are fast. Arguably, the greater overhead is in the components themselves. You wouldn't write code like this...

```javascript
function StrawManComponent(props) {
  const value = expensivelyCalculateValue(props.foo);

  return (
    <p>the value is {value}</p>
  );
}
```

...because you'd be carelessly recalculating `value` on every update, regardless of whether `props.foo`had changed. But it's extremely common to do unnecessary computation and allocation in ways that seem much more benign:

```javascript
function MoreRealisticComponent(props) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <p>Selected {selected ? selected.name : 'nothing'}</p>

      <ul>
        {props.items.map(item =>
          <li>
            <button onClick={() => setSelected(item)}>
              {item.name}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
```

Here, we're generating a new array of virtual `<li>` elements — each with their own inline event handler — on every state change, regardless of whether `props.items` has changed. Unless you're unhealthily obsessed with performance, you're not going to optimise that. There's no point. It's plenty fast enough. But you know what would be even faster? *Not doing that.*

##  这不仅仅是差异

React 和其他虚拟 DOM 框架使用的差异算法很快。可以说，组件本身的开销更大。你不会写这样的代码......

```javascript
function StrawManComponent(props) {
  const value = expensivelyCalculateValue(props.foo);

  return (
    <p>the value is {value}</p>
  );
}
```

因为无论 props.foo 是否已更改，您都会在每次更新时不小心重新计算值。但是以不同的方式进行不必要的计算和分配是非常常见的：

```javascript
function MoreRealisticComponent(props) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <p>Selected {selected ? selected.name : 'nothing'}</p>

      <ul>
        {props.items.map(item =>
          <li>
            <button onClick={() => setSelected(item)}>
              {item.name}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
```

在这里，无论 props.items 是否发生了变化，我们都会在每次状态更改时生成一个新的虚拟 `<li>` 元素数组 - 每个元素都有自己的内联事件处理程序。除非你不熟悉性能，否则你不会优化它。毫无意义。它足够快。但你知道什么会更快吗？不这样做。

The danger of defaulting to doing unnecessary work, even if that work is trivial, is that your app will eventually succumb to 'death by a thousand cuts' with no clear bottleneck to aim at once it's time to optimise.

Svelte is explicitly designed to prevent you from ending up in that situation.

做不必要的工作默认是危险的，即使这项工作是微不足道的，你的应用程序最终会屈服于“千人减少死亡”，没有明确的瓶颈，无法一次性瞄准优化。Svelte 明确旨在防止您在这种情况下结束。

## Why do frameworks use the virtual DOM then?

It's important to understand that virtual DOM *isn't a feature*. It's a means to an end, the end being declarative, state-driven UI development. Virtual DOM is valuable because it allows you to build apps without thinking about state transitions, with performance that is *generally good enough*. That means less buggy code, and more time spent on creative tasks instead of tedious ones.

But it turns out that we can achieve a similar programming model without using virtual DOM — and that's where Svelte comes in.

## 为什么框架会使用虚拟 DOM 呢？

了解虚拟 DOM 不是一项特性非常重要。它是达到目的的手段，最终是声明性的，由状态驱动的 UI 开发。虚拟 DOM 很有价值，因为它允许您在不考虑状态转换的情况下构建应用程序，其性能通常足够好。这意味着更少的错误代码，更多的时间花在创造性任务而不是乏味的任务上。但事实证明，我们可以在不使用虚拟 DOM 的情况下实现类似的编程模型 - 这就是 Svelte 的用武之地。





# Technique



## Share

[《Don't make me think》读书笔记](https://github.com/unbrain/Arts/issues/2)
