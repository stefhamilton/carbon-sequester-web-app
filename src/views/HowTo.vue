<template>
  <div>
    <h1>{{ $t('how-to-create-biochar') }}</h1>
    <div class="how-to">
      <ol class="how-to-list">
        <li>
          {{ $t('view-youtube') }}
          <a
            href="https://www.youtube.com/results?search_query=how+to+create+biochar"
            >video</a
          >
          {{ $t('on-how-to-make-biochar') }} 
        </li>
        <li>{{ $t('take-before-picture(s)-of-agriculture-waste-(see below)') }}  </li>
        <img
      src="@/assets/before.png"
      height="200"
      display="block"
      margin-left="auto"
      margin-right="auto"
    />
            <img
      src="@/assets/coconut_shells_small.jpg"
      height="200"
      display="block"
      margin-left="auto"
      margin-right="auto"
    />
        <li>{{ $t('make-biochar-take-during-picture(s)-(see below)') }}</li>
        <img
      src="@/assets/during_ex.png"
      height="200"
      display="block"
      margin-left="auto"
      margin-right="auto"
    />
        <li>{{ $t('take-after-picture(s)-that-shows-the-full-biochar-(see below)') }}</li>
        <img
      src="@/assets/after.png"
      height="200"
      display="block"
      margin-left="auto"
      margin-right="auto"
    />
        <li>
          {{ $t('take-after-picture-that-shows-agriculture-waste-is-gone.-(see example)') }}
        </li>
      </ol>
      <p>
        {{$t('the-goal') }}
      </p>
      <p>{{$t('tips-roll') }}</p>
      <p>
        {{ $t('ready-to-start') }} 
      </p>
      <p>{{ $t('get-started') }}<router-link to="/">{{ $t ('here') }}</router-link></p>
    </div>
  </div>
</template>
