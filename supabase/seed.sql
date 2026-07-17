insert into public.story_scenes (id, origin, chapter, title, body, is_ending)
values
  (
    'HUMAN_START',
    'human',
    1,
    'Aliens Exist',
    'Alien robots attack a desert power relay center. Prizm and Juci stand with the player as news footage reveals transforming machines fighting over Earth energy.',
    false
  ),
  (
    'CYBER_START',
    'cybertronian',
    1,
    'First Light',
    'Your optics activate beneath emergency lighting. The chamber around you is intact, but the city beyond it is not.',
    false
  )
on conflict (id) do nothing;
