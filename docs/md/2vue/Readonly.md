![image](https://user-images.githubusercontent.com/27124147/190903434-e1bf729c-7ff9-4505-b5c9-81e1ff0e4d9f.png)

# Reactive Effect 

实现 readonly  isReactive isReadonly stop onstop

## readonly

1.他其实就是简单的 reactive 只是不可写 不收集依赖也不触发依赖

2.由于他们有不少的共同点 我们将代码的逻辑尽可能的抽离出来想源码靠拢

```typescript
funtion createReactiveObject (target, baseHanlders) {
  return new Proxy(target, baseHandlers);
}

export function reactive(target) {
  return createReactiveObject(target, mutableHandlers);
}

export function readonly(target) {
  return createReactiveObject(target, readonlyHandlers);
}
```



```typescript
const get = createGetter();
const readOnly = createGetter(true);
const set createSetter();

function createGetter(isReadOnly) {
  return function(target, key) {
    const res = Reflect.get(target, key);
    if(!isReadOnly) {
      track(target, key);
    }
    return res;
  }
}

function createSetter(isReadOnly) {
  return function(target, key, value) {
    const res = Reflect.set(target, key, value);
    trigger(target, key);
    return res;
  }
}

export function mutableHandlers() {
  return {
    get,
    set
  }
}

export function readonlyHandlers {
	return {
    get: readonlyGet,
    set(target, key){
      console.warn(`set failed ${String(key)} is readonly`);
      return true;
    }
  }
}
```

## isReactive isReadonly

```typescript
// reactive.ts
export const enum ReactiveFlag {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

export function isReactive(target) {
  return !!(target[ReactiveFlag.IS_REACTIVE])
}

export function isReadonly() {
  return !!(target[ReactiveFlag.IS_READONLY])
}
```

```typescript
// baseHandler.ts
function createGetter(isReadOnly) {
  return function(target, key) {
    if(key === target[ReactiveFlag.IS_REACTIVE]) {
      return !isReadOnly;
    } else if (target[ReactiveFlag.IS_READONLY]) {
      return isReadOnly;
    }
  }
}
```

## stop

stop 要较为复杂些我们先写测试代码

```typ
describe('reactive', () => {
	it('stop', () => {
		const dummey;
    const obj = reactive({a: 1});
    const runner = effect(() => {
    	dummy = obj.a;
    })
    expect(dummy).toBe(1);
    obj.a++;
    expect(dummy).toBe(2);
    stop(runner);
    obj++;//既有 get 也有 set
    expect(dummy).toBe(2);
    runner();
    expect(dummy).toBe(3);
	})
})
```

1.get 会重新收集依赖，set 会触发依赖 所以 stop 后我们需要对这两部分都进行处理

```typescript
let shouldTrack = false;// 是否执行依赖
let activeEffect;

track() {
  // 最开始是若不执行我们将不收集依赖 这样重新 get 就不会触发手机
  if(!shouldTrack) return;
  ...
  // 收集 dep 方便后续撤销副作用
  activeEffect.deps.push(dep)
}

class ReactiveEffect {
  ...
  onStop?:()=> {};
  active = true;
  deps = [];
  run() {
    // 不激活的直接执行
    is(!this.active) {
      return this._fn()
    }
    shouldTrack = true;
    activeEffect = this;
    const res = this._fn();
    shouldTrack = false;
    return res;
  }

	stop() {
		if(this.active) {
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.active = false;
    }
  }
}

const cleanupEffect = (effect) => {
  effect.deps.forEach(dep => {
    dep.delete(effect);
  })
}

export function effect(fn, options = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  extend(_effect, options);
  _effect.run();
  const runner = _effect.run.bind(_effect);
  // 收集下 effect 方便调用
  runner.effect = _effect;
  return runner;
}

exprt function stop (runner) {
  return runner.effect.stop();
}
```







