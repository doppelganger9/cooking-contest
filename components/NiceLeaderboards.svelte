<script>
import { i18n } from '../stores/i18n.js';

export let leaders = [];
export let maxScore = 500;

const colors = [
	'#FFB900',
	'#69797E',
	'#847545',
	'#E74856',
	'#0078D7',
	'#0099BC',
	'#7A7574',
	'#767676',
	'#FF8C00',
	'#E81123',
	'#0063B1',
	'#2D7D9A',
	'#5D5A58',
	'#4C4A48',
	'#F7630C',
	'#EA005E',
	'#8E8CD8',
	'#00B7C3',
	'#68768A',
	'#CA5010',
	'#C30052',
	'#6B69D6',
	'#038387',
	'#515C6B',
	'#4A5459',
	'#DA3B01',
	'#E3008C',
	'#8764B8',
	'#00B294',
	'#567C73',
	'#647C64',
	'#EF6950',
	'#BF0077',
	'#744DA9',
	'#018574',
	'#486860',
	'#525E54',
	'#D13438',
	'#C239B3',
	'#B146C2',
	'#00CC6A',
	'#498205',
	'#FF4343',
	'#9A0089',
	'#881798',
	'#10893E',
	'#107C10',
	'#7E735F'
];

</script>

<style>
section {
  background-color: white;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

*{
  box-sizing: border-box;
}

.Leaderboard{
    /* padding: 40px 20px; */
    margin: auto;
    max-width: 800px;
}
.leader-wrap {
    display: flex;
}

.leader{
    padding: 8px 16px;
    margin-bottom: 8px;
    animation-name: revealLeaders;
    animation-duration: .4s;
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
}

.leader-ava {
    padding: 8px;
    margin-right: 16px;
    position: relative;
}

.leader-score {
    display: flex;
    align-items: center;
    opacity: 0.6;
}

.leader-score i {
    display: block;
    margin-right: 4px;
}

.leader-score_title{
    line-height: 1;
}

.leader-ava::after{
    content: "";
    left: 0;
    bottom: 0;
    display: block;
    height: 6px;
    position: absolute;
    border: 0px transparent solid;
    border-left-width: 20px;
    border-right-width: 20px;
    border-bottom-width: 6px;
    border-bottom-color: #fff;
    transition: border-bottom-color .2s ease-in-out;
}

.leader-bar {
    margin-top: 8px;
    animation-name: barLoad;
    animation-duration: .4s;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.6, 0.2, 0.1, 1);
    transform-origin: left;
}

.bar {
    height: 4px;
    border-radius: 2px;
}

@keyframes revealLeaders{
    from{
        transform: translateX(-200px);
        opacity: 0;
    }
    to{
        transform: none;
        opacity: 1;
    }
}

@keyframes barLoad{
    from{
        transform: scaleX(0);
    }
    to{
        transform: scaleX(1)
    }
}
</style>

<section>
  <div class="Leaderboard">
    <h2>{$i18n['leaderboard']}</h2>
    <div class="leaders">
      {#if leaders}
      {#each leaders as leader, i}
          <div
            key={leader['meal-id']}
            style="animation-delay: {i * 0.1 + 's'};"
            class="leader"
          >
            <div class="leader-wrap">
              {#if i<3 }
                <div
                  style="background-color: {colors[i]};"
                  class="leader-ava"
                >
                  <svg
                    fill="#ffffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    height={24}
                    width={24}
                    viewBox="0 0 32 32"
                  >
                    <path d="M 16 3 C 14.354991 3 13 4.3549901 13 6 C 13 7.125993 13.63434 8.112309 14.5625 8.625 L 11.625 14.5 L 7.03125 11.21875 C 7.6313215 10.668557 8 9.8696776 8 9 C 8 7.3549904 6.6450096 6 5 6 C 3.3549904 6 2 7.3549904 2 9 C 2 10.346851 2.9241199 11.470238 4.15625 11.84375 L 6 22 L 6 26 L 6 27 L 7 27 L 25 27 L 26 27 L 26 26 L 26 22 L 27.84375 11.84375 C 29.07588 11.470238 30 10.346852 30 9 C 30 7.3549901 28.645009 6 27 6 C 25.354991 6 24 7.3549901 24 9 C 24 9.8696781 24.368679 10.668557 24.96875 11.21875 L 20.375 14.5 L 17.4375 8.625 C 18.36566 8.112309 19 7.125993 19 6 C 19 4.3549901 17.645009 3 16 3 z M 16 5 C 16.564129 5 17 5.4358709 17 6 C 17 6.5641291 16.564129 7 16 7 C 15.435871 7 15 6.5641291 15 6 C 15 5.4358709 15.435871 5 16 5 z M 5 8 C 5.5641294 8 6 8.4358706 6 9 C 6 9.5641286 5.5641291 10 5 10 C 4.4358709 10 4 9.5641286 4 9 C 4 8.4358706 4.4358706 8 5 8 z M 27 8 C 27.564129 8 28 8.4358709 28 9 C 28 9.5641283 27.564128 10 27 10 C 26.435872 10 26 9.5641283 26 9 C 26 8.4358709 26.435871 8 27 8 z M 16 10.25 L 19.09375 16.4375 L 20.59375 16.8125 L 25.59375 13.25 L 24.1875 21 L 7.8125 21 L 6.40625 13.25 L 11.40625 16.8125 L 12.90625 16.4375 L 16 10.25 z M 8 23 L 24 23 L 24 25 L 8 25 L 8 23 z" />
                  </svg>
                </div>
              {/if}
              <div class="leader-content">
                <div class="leader-name">{i + 1 + '. ' + leader.title}</div>
                <div class="leader-score">
                  <i class="fas fa-trophy" style="color: {colors[i]};"></i>
                  <!-- <svg style="color: {colors[i]};"
                    fill="currentColor"
                    height="20"
                    viewBox="0 0 493 493"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M247,468 C369.05493,468 468,369.05493 468,247 C468,124.94507 369.05493,26 247,26 C124.94507,26 26,124.94507 26,247 C26,369.05493 124.94507,468 247,468 Z M236.497159,231.653661 L333.872526,231.653661 L333.872526,358.913192 C318.090922,364.0618 303.232933,367.671368 289.298112,369.742004 C275.363292,371.81264 261.120888,372.847943 246.570473,372.847943 C209.522878,372.847943 181.233938,361.963276 161.702804,340.193617 C142.17167,318.423958 132.40625,287.169016 132.40625,246.427855 C132.40625,206.805956 143.738615,175.914769 166.403684,153.753368 C189.068753,131.591967 220.491582,120.511432 260.673112,120.511432 C285.856523,120.511432 310.144158,125.548039 333.536749,135.621403 L316.244227,177.257767 C298.336024,168.303665 279.700579,163.826682 260.337335,163.826682 C237.840155,163.826682 219.820296,171.381591 206.277218,186.491638 C192.734139,201.601684 185.962702,221.915997 185.962702,247.435186 C185.962702,274.073638 191.419025,294.415932 202.331837,308.462679 C213.244648,322.509425 229.109958,329.532693 249.928244,329.532693 C260.785092,329.532693 271.809664,328.413447 283.002291,326.174922 L283.002291,274.96891 L236.497159,274.96891 L236.497159,231.653661 Z"></path>
                  </svg> -->
                  <div class="leader-score_title">{leader.globalRating}</div>
                </div>
              </div>
            </div>
            <div style="animation-delay: {0.4 + i * 0.2 + 's' };" class="leader-bar">
              <div
                style="
                  background-color: {colors[i]};
                  width: {leader.globalRating / maxScore * 100 + '%'};
                "
                class="bar"
              />
            </div>
          </div>
        {/each}
      {:else}
        <div class="empty">Rien</div>
      {/if}
    </div>
  </div>
</section>