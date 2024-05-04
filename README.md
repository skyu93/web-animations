# web-animations
웹 애니메이션의 새로운 표준, Web Animations API

상대적으로 자유로운 제어가 어려웠던 CSS 애니메이션을 자바스크립트의 힘을 빌어 더 강력하게 바꿔준다ㅓ.
CSS 애니메이션을 기반으로 하므로
CSS 애니메이션의 장점을 그대로 살리면서 강력하게 업그레이드 해줌

## CSS 애니메이션
### 장점
별도의 Compositor Thread에서 작업하므로 효율적(GPU가 처리)
코드가 간단한다(선언형)

### 단점
세밀하게 컨트롤하기 어렵다.
자유로운 제어가 어렵다.

## JS 애니메이션
### 장점
스타일 값 단계 마다 세밀하게 컨트롤 가능하다.
제어가 자유롭다.

### 단점
Main Thread에서 작업하므로, 다른 작업들의 영향을 받아 버벅일 수 있다.
코드가 복잡하다(명령형)

---


## KeyframeEffect
원하는 요소에 애니메이션을 적용하기 위한 설정은 Web Animations API의 KeyfreamEffect를 이용한다.
설정후 사용은 Animation 객체를 이용한다.

```js
const effect = new KeyframeEffect(target, keyframes, options);
```
- target: 애니메이션이 적용될 대상 요소 (HTMLElement).
- keyframes: 애니메이션의 키프레임을 지정, 애니메이션의 각 단계에서 요소의 스타일 변화를 나타냄
    ```js
     // 키프레임에 offset을 지정하지 않은 경우
     // 브라우저는 자동으로 각 키프레임을 균등하게 분배
    const keyframes = [
       { transform: 'translateX(0px)', opacity: 1 },
       { transform: 'translateX(100px)', opacity: 0 }
      ]
    ```
   또는 키프레임의 offset을 명시적으로 지정할 수 있음
    ```js
    const keyframes = [
      { offset: 0, transform: 'translateX(0px)', opacity: 1 },
      { offset: 1, transform: 'translateX(100px)', opacity: 0 }
    ];
    ```
- options: 애니메이션의 타이밍 및 재생 설정을 포함하는 옵션
    ```js
    const options = {
        // 애니메이션의 지속 시간
        duration: 2000,// (ms: 밀리초 단위)
        
        // 애니메이션의 동작 
        easing: 'ease-in-out',// (linear, ease, ease-in, ease-out, ease-in-out)
  
        // 반복 횟수      
        iterations: 3,// (무한 : Infinity)
  
        // 진행 방향 
        direction: 'alternate', // (normal, reverse, alternate, alternate-reverse)
        
        // 애니메이션 시작되기 전이나 종료된 후에 어떤 스타일을 적용할지 지정
        fill: 'forwards', // (none, forwards, backwards, both)
        
        // 애니메이션 지연 시간
        delay: 500, // (ms: 밀리초 단위)
        
        // 애니메이션 종료된 후 지연 시간
        endDelay: 200 // (ms: 밀리초 단위)
    }
    ```
## Animation
생성된 'animation' 객체를 통해 애니메이션을 시작,중지 또는 제어 할 수 있다.

```js
const animation = new Animation(effect, document.timeline);
animation.play();   // 애니메이션 시작
animation.pause();  // 애니메이션 일시 정지
animation.cancel(); // 애니메이션 취소
```
<details>
<summary>document.timeline 란?</summary>
document.timeline은 Web Animations API에서 애니메이션을 제어하고 동기화하는 기본 타임라인 역할을 한다.
이를 통해 애니메이션이 문서의 시간 흐름에 따라 적절하게 동작하도록 할 수 있다.
</details>

## GroupEffect
- GroupEffect는 Web Animations API에서 제공하는 KeyframeEffect의 그룹화된 버전
- 여러 애니메이션 효과를 하나의 그룹으로 묶는 역할

#### GroupEffect: 동시에 애니메이션을 재생하는 그룹.
```js
let group = new SequenceEffect([effect1, effect2]);
let animation = new Animation(group, document.timeline);
animation.play();
```
#### SequenceEffect: 순차적으로 애니메이션을 재생하는 그룹.
```js
let group = new GroupEffect([effect1, effect2]);
let animation = new Animation(group, document.timeline);
animation.play();
```

