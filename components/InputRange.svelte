<script>
export let id, min, max, step, value, name;
</script>
<style>
  input[type=range] {
    -webkit-appearance: none;
    margin: 10px 0;
    width: 50vw;
    background-color: transparent;
    --slider-bg-color: #ff3e00;
    --thumb-bg-color: #65001c;
    --border-color: #000000;
    --box-shadow-end-color: #0d0d0d;
    --border-color-2: #000101;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px var(--border-color), 0px 0px 0px var(--box-shadow-end-color);
    background: var(--slider-bg-color);
    border-radius: 25px;
    border: 0px solid var(--border-color-2);
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px var(--border-color), 0px 0px 0px var(--box-shadow-end-color);
    border: 0px solid var(--border-color);
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: var(--thumb-bg-color);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3.6px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: var(--slider-bg-color);
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px var(--border-color), 0px 0px 0px var(--box-shadow-end-color);
    background: var(--slider-bg-color);
    border-radius: 25px;
    border: 0px solid var(--border-color-2);
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px var(--border-color), 0px 0px 0px var(--box-shadow-end-color);
    border: 0px solid var(--border-color);
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: var(--thumb-bg-color);
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 39px 0;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: var(--slider-bg-color);
    border: 0px solid var(--border-color-2);
    border-radius: 50px;
    box-shadow: 0px 0px 0px var(--border-color), 0px 0px 0px var(--box-shadow-end-color);
  }
  input[type=range]::-ms-fill-upper {
    background: var(--slider-bg-color);
    border: 0px solid var(--border-color-2);
    border-radius: 50px;
    box-shadow: 0px 0px 0px var(--border-color), 0px 0px 0px var(--box-shadow-end-color);
  }
  input[type=range]::-ms-thumb {
    box-shadow: 0px 0px 0px var(--border-color), 0px 0px 0px var(--box-shadow-end-color);
    border: 0px solid var(--border-color);
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: var(--thumb-bg-color);
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: var(--slider-bg-color);
  }
  input[type=range]:focus::-ms-fill-upper {
    background: var(--slider-bg-color);
  }
</style>

<input id={id} name={name} type="range" min={min} max={max} step={step} bind:value={value}/>