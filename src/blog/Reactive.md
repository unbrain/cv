![image](https://user-images.githubusercontent.com/27124147/190862350-fae3b553-069c-4a49-8acb-c7e86a6fc04c.png)


# Reactive Effect

响应式的方便在于能够自动去执行一些程序员设定好的函数

```javascript
let dummy = {age: 0};
let curAge;

dummy.age = 1; // 我们期望 curAge 也为 1

const effect = (number) => {
  curAge = number;
}

dummy.age++;
effect(dummy.age);

// 但是咱们就是懒对吧  不调用能不能行？啊？
```

所以到了 vue 里面我们的写法就是

```javascript
const dummy = reactive({age: 0})
let curAge;

effect(() => {
  curAge = dummy.age;
})

dummy.age++;
```



这里使用到了两个 vue 导出的 `reactive` 以及 `effect` 我们分别来实现下

## Reactive

使用TDD，我们期望达到的效果，先写单测代码

```typescript
describe('reactive', () => {
	it('set', () => {
		const dummey = {a: 1};
    const observed = reactive({a: 1});
    expect(observer).not.tobe(dummey);
    expect(observed.a).tobe(1);
	})
})
```



实现：

```typescript
export function reactive(raw) {
	return new Proxy(raw) {
		get(target, key) {
      const res = Reflect.get(target, key);
			//依赖收集
			track(target, key);
			return res;
		},
		set(target, key, value) {
			const res = Reflect.set(target, key, value);
			// 触发依赖
			trigger(target, key);
			return res;
		}
	}
}
```

此时多出来两个函数分别是依赖收集与依赖触发。

一个数据一旦被取值，那么他就需要被依赖收集 以便当有副作用时能够被触发。而一个值被重新赋值了那么他的副作用需要自动执行。

1.触发收集一定是在Effect中出现的，所以将track放在 effect 中

2.依赖触发其实就是再次执行传入的effect中的函数，所以也放在 effect 代码中实现

我们在最后讨论这两函数的实现

## Effect

TDD 我们期望运行后 effect 会被默认执行一次

```typescript
describe('effect', () => {
  it('default run', () => {
    const dummy = reactive({age:0});
    let age;
    effect(() => {
      age = dummy.age++;
    })
    expect(age).tobe(1);
  })
})
```

我们先写个大致形式

```typescript
class ReactiveEffect {
	constructor(fn) {
		this._fn = fn;
	}
	
	run() {
		this.run();
	}
}

export function effect(fn) {
	const _effect = new ReactiveEffect(fn);
	_efftct.run();
}
```

此时 effect 已实现了自动执行一次

我们再来思考如何收集依赖

1. 每个 effect 都有其 targetsMap 用来存放传入的 target 
2. 每个 target 都有 depsMap 用来存放 key
3. 每个 key 都有 对用的 dep 用来存放 fn
4. 为了收集 fn 其实直接收集当前 effect 即可

### track 副作用收集

```typescript
class ReactiveEffect {
	constructor(fn) {
		this._fn = fn;
	}
	
	run() {
		activeEffect = this;
		this.run();
	}
}

const activeEffect;
const targetsMap = new Map();

export funtion track(target, key) {
	const depsMap = targetsMap.get(traget);
	// 初始化
	if(!depsMap) {
		depsMap = new Map();
		deps.set(target, depsMap);
	}
	const dep = depsMap.get(key);
	if(!dep) {
		dep = new Set();
		dep.set(key, dep);
	}
	
	dep.add(activeEffect)
}

export function effect(fn) {
	const _effect = new ReactiveEffect(fn);
	activeEffect = _effect;
	_efftct.run();
}
```



### 副作用调用

```typescript
export function trigger (target, key) {
  const depsMap = targetsMap.get(target);
  if (depMap) {
    const dep = depsMap.get(key)
    for(let effect of dep) {
      effect.run();
    }
  }
}
```

### scheduler

看下 vue 测试代码

```typescript
import { describe, expect, it } from "vitest";
it('scheduler', () => {
    // 默认执行 run 不执行 scheduler 副作用时粗发 不执行 run 执行 scheduler
    let dummy;
    let run: any;
    const scheduler = vi.fn(() => {
      run = runner;
    })
    const obj = reactive({ foo: 1 });
    const runner = effect(() => {
      dummy = obj.foo;
    }, { scheduler });

    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1)
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);
    run();
    expect(dummy).toBe(2);
  })
```

1.默认执行 run 不执行 scheduler 副作用时粗发 不执行 run 执行 scheduler

2.effct 返回的将是一个函数



```typescript
class ReactiveEffect {
  private _fn: any;
	constructor(fn, public scheduler?) {
		this._fn = fn;
	}
	
	run() {
		activeEffect = this;
		return this.run();
	}
}

const activeEffect;
const targetsMap = new Map();

export funtion track(target, key) {
	const depsMap = targetsMap.get(traget);
	// 初始化
	if(!depsMap) {
		depsMap = new Map();
		deps.set(target, depsMap);
	}
	const dep = depsMap.get(key);
	if(!dep) {
		dep = new Set();
		dep.set(key, dep);
	}
	
	dep.add(activeEffect)
}

export function trigger (target, key) {
  const depsMap = targetsMap.get(target);
  if (depMap) {
    const dep = depsMap.get(key)
    for(let effect of dep) {
      effect.scheduler ? effect.scheduler() : effect.run();
    }
  }
}

export function effect(fn, options:any = {}) {
	const _effect = new ReactiveEffect(fn, options.scheduler);
	activeEffect = _effect;
	_effect.run();
	return _effect.run.bind(_effect);// run中有调用this
}
```

