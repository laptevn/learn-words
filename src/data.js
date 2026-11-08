const words = (list) => list.map((item) => {
  const [en, ru, emoji] = item.split('|')
  return { en, ru, emoji }
})

export const groups = [
  { id: 'family', title: 'Семья', emoji: '👨‍👩‍👧', color: '#ff7ca8', words: words([
    'mother|мама|👩','father|папа|👨','parents|родители|👨‍👩‍👧','sister|сестра|👧','brother|брат|👦','grandmother|бабушка|👵','grandfather|дедушка|👴','daughter|дочь|👧','son|сын|👦','aunt|тётя|👩','uncle|дядя|👨','cousin|двоюродный брат или сестра|🧒','baby|малыш|👶','child|ребёнок|🧒','children|дети|👧','family|семья|👨‍👩‍👧‍👦','friend|друг|🤝','girl|девочка|👧','boy|мальчик|👦','people|люди|👥',
  ])},
  { id: 'animals', title: 'Животные', emoji: '🐾', color: '#ff9e57', words: words([
    'cat|кошка|🐱','dog|собака|🐶','rabbit|кролик|🐰','horse|лошадь|🐴','cow|корова|🐮','pig|свинья|🐷','sheep|овца|🐑','goat|коза|🐐','mouse|мышь|🐭','bear|медведь|🐻','fox|лиса|🦊','wolf|волк|🐺','lion|лев|🦁','tiger|тигр|🐯','monkey|обезьяна|🐵','elephant|слон|🐘','giraffe|жираф|🦒','bird|птица|🐦','fish|рыба|🐟','turtle|черепаха|🐢',
  ])},
  { id: 'school', title: 'Школа', emoji: '🎒', color: '#6f8cff', words: words([
    'school|школа|🏫','teacher|учитель|👩‍🏫','student|ученик|🧑‍🎓','classroom|класс|🪑','lesson|урок|📖','book|книга|📘','notebook|тетрадь|📓','pen|ручка|🖊️','pencil|карандаш|✏️','ruler|линейка|📏','eraser|ластик|🧼','desk|парта|🪑','board|доска|🟩','backpack|рюкзак|🎒','homework|домашняя работа|📝','question|вопрос|❓','answer|ответ|💬','letter|буква|🔤','word|слово|🔠','number|число|🔢',
  ])},
  { id: 'food', title: 'Еда', emoji: '🍽️', color: '#ff755f', words: words([
    'bread|хлеб|🍞','cheese|сыр|🧀','egg|яйцо|🥚','milk|молоко|🥛','butter|масло|🧈','soup|суп|🍲','salad|салат|🥗','rice|рис|🍚','pasta|макароны|🍝','meat|мясо|🥩','chicken|курица|🍗','fish|рыба|🐟','sandwich|бутерброд|🥪','pizza|пицца|🍕','cake|торт|🎂','cookie|печенье|🍪','ice cream|мороженое|🍦','chocolate|шоколад|🍫','breakfast|завтрак|🥞','dinner|ужин|🍽️',
  ])},
  { id: 'fruits', title: 'Фрукты и овощи', emoji: '🍓', color: '#65be6b', words: words([
    'apple|яблоко|🍎','banana|банан|🍌','orange|апельсин|🍊','lemon|лимон|🍋','pear|груша|🍐','peach|персик|🍑','grapes|виноград|🍇','strawberry|клубника|🍓','watermelon|арбуз|🍉','cherry|вишня|🍒','pineapple|ананас|🍍','tomato|помидор|🍅','potato|картофель|🥔','carrot|морковь|🥕','corn|кукуруза|🌽','cucumber|огурец|🥒','onion|лук|🧅','pepper|перец|🫑','mushroom|гриб|🍄','broccoli|брокколи|🥦',
  ])},
  { id: 'body', title: 'Тело', emoji: '🙋‍♀️', color: '#f09b79', words: words([
    'head|голова|🙂','face|лицо|😊','hair|волосы|💇‍♀️','eye|глаз|👁️','ear|ухо|👂','nose|нос|👃','mouth|рот|👄','tooth|зуб|🦷','neck|шея|🧣','shoulder|плечо|🤷‍♀️','arm|рука|💪','hand|кисть руки|✋','finger|палец|☝️','leg|нога|🦵','knee|колено|🦵','foot|ступня|🦶','toe|палец ноги|🦶','back|спина|🔙','heart|сердце|❤️','body|тело|🧍‍♀️',
  ])},
  { id: 'clothes', title: 'Одежда', emoji: '👗', color: '#cf72dd', words: words([
    'dress|платье|👗','shirt|рубашка|👔','T-shirt|футболка|👕','skirt|юбка|👗','trousers|брюки|👖','jeans|джинсы|👖','shorts|шорты|🩳','jacket|куртка|🧥','coat|пальто|🧥','sweater|свитер|🧶','shoes|туфли|👞','boots|сапоги|👢','socks|носки|🧦','hat|шляпа|👒','cap|кепка|🧢','scarf|шарф|🧣','gloves|перчатки|🧤','pocket|карман|👖','button|пуговица|🔘','umbrella|зонт|☂️',
  ])},
  { id: 'home', title: 'Дом', emoji: '🏡', color: '#e69b49', words: words([
    'house|дом|🏠','room|комната|🚪','kitchen|кухня|🍳','bedroom|спальня|🛏️','bathroom|ванная|🛁','living room|гостиная|🛋️','door|дверь|🚪','window|окно|🪟','wall|стена|🧱','floor|пол|🟫','table|стол|🪑','chair|стул|🪑','bed|кровать|🛏️','sofa|диван|🛋️','lamp|лампа|💡','clock|часы|🕐','mirror|зеркало|🪞','cup|чашка|☕','plate|тарелка|🍽️','spoon|ложка|🥄',
  ])},
  { id: 'nature', title: 'Природа', emoji: '🌈', color: '#43b989', words: words([
    'sun|солнце|☀️','moon|луна|🌙','star|звезда|⭐','sky|небо|🌤️','cloud|облако|☁️','tree|дерево|🌳','flower|цветок|🌸','grass|трава|🌿','forest|лес|🌲','mountain|гора|⛰️','river|река|🏞️','lake|озеро|🌊','sea|море|🌊','island|остров|🏝️','stone|камень|🪨','sand|песок|🏖️','earth|земля|🌍','leaf|лист|🍃','rainbow|радуга|🌈','field|поле|🌾',
  ])},
  { id: 'weather', title: 'Погода', emoji: '⛅', color: '#53a8e8', words: words([
    'weather|погода|🌤️','sunny|солнечно|☀️','cloudy|облачно|☁️','rainy|дождливо|🌧️','snowy|снежно|🌨️','windy|ветрено|💨','hot|жарко|🥵','warm|тепло|🌤️','cold|холодно|🥶','cool|прохладно|🧥','rain|дождь|🌧️','snow|снег|❄️','wind|ветер|💨','storm|буря|⛈️','thunder|гром|🌩️','lightning|молния|⚡','fog|туман|🌫️','ice|лёд|🧊','temperature|температура|🌡️','season|время года|🍂',
  ])},
  { id: 'colors', title: 'Цвета и формы', emoji: '🎨', color: '#ef65a7', words: words([
    'red|красный|🔴','orange|оранжевый|🟠','yellow|жёлтый|🟡','green|зелёный|🟢','blue|синий|🔵','purple|фиолетовый|🟣','pink|розовый|🌸','brown|коричневый|🟤','black|чёрный|⚫','white|белый|⚪','grey|серый|🩶','color|цвет|🎨','circle|круг|⭕','square|квадрат|🟦','triangle|треугольник|🔺','rectangle|прямоугольник|▭','line|линия|➖','point|точка|•','heart|сердце|❤️','diamond|ромб|🔶',
  ])},
  { id: 'numbers', title: 'Числа', emoji: '🔢', color: '#7f72e9', words: words([
    'one|один|1️⃣','two|два|2️⃣','three|три|3️⃣','four|четыре|4️⃣','five|пять|5️⃣','six|шесть|6️⃣','seven|семь|7️⃣','eight|восемь|8️⃣','nine|девять|9️⃣','ten|десять|🔟','eleven|одиннадцать|1️⃣','twelve|двенадцать|2️⃣','thirteen|тринадцать|3️⃣','fourteen|четырнадцать|4️⃣','fifteen|пятнадцать|5️⃣','sixteen|шестнадцать|6️⃣','seventeen|семнадцать|7️⃣','eighteen|восемнадцать|8️⃣','nineteen|девятнадцать|9️⃣','twenty|двадцать|2️⃣0️⃣',
  ])},
  { id: 'transport', title: 'Транспорт', emoji: '🚲', color: '#4f9ddb', words: words([
    'car|машина|🚗','bus|автобус|🚌','train|поезд|🚆','plane|самолёт|✈️','ship|корабль|🚢','boat|лодка|⛵','bicycle|велосипед|🚲','scooter|самокат|🛴','motorcycle|мотоцикл|🏍️','taxi|такси|🚕','truck|грузовик|🚚','helicopter|вертолёт|🚁','rocket|ракета|🚀','tram|трамвай|🚊','subway|метро|🚇','station|станция|🚉','road|дорога|🛣️','ticket|билет|🎫','wheel|колесо|🛞','traffic light|светофор|🚦',
  ])},
  { id: 'jobs', title: 'Профессии', emoji: '🧑‍🚀', color: '#ec8b45', words: words([
    'teacher|учитель|👩‍🏫','doctor|врач|👩‍⚕️','nurse|медсестра|🧑‍⚕️','dentist|стоматолог|🦷','cook|повар|🧑‍🍳','farmer|фермер|🧑‍🌾','driver|водитель|🧑‍✈️','pilot|пилот|👩‍✈️','police officer|полицейский|👮','firefighter|пожарный|🧑‍🚒','artist|художник|🎨','singer|певец|🎤','dancer|танцор|💃','actor|актёр|🎭','builder|строитель|👷','scientist|учёный|🧑‍🔬','astronaut|космонавт|🧑‍🚀','vet|ветеринар|🐾','writer|писатель|✍️','photographer|фотограф|📷',
  ])},
  { id: 'sports', title: 'Спорт', emoji: '🏆', color: '#f2b43e', words: words([
    'sport|спорт|🏆','football|футбол|⚽','basketball|баскетбол|🏀','volleyball|волейбол|🏐','tennis|теннис|🎾','hockey|хоккей|🏒','swimming|плавание|🏊‍♀️','running|бег|🏃‍♀️','cycling|велоспорт|🚴‍♀️','skiing|лыжи|⛷️','skating|коньки|⛸️','gymnastics|гимнастика|🤸‍♀️','dance|танцы|💃','team|команда|👥','ball|мяч|⚽','game|игра|🎮','race|гонка|🏁','winner|победитель|🥇','medal|медаль|🏅','training|тренировка|💪',
  ])},
  { id: 'toys', title: 'Игры и игрушки', emoji: '🧸', color: '#b86ee5', words: words([
    'toy|игрушка|🧸','doll|кукла|🪆','teddy bear|плюшевый мишка|🧸','ball|мяч|⚽','kite|воздушный змей|🪁','robot|робот|🤖','blocks|кубики|🧱','puzzle|пазл|🧩','game|игра|🎮','chess|шахматы|♟️','cards|карты|🃏','drum|барабан|🥁','guitar|гитара|🎸','balloon|воздушный шар|🎈','swing|качели|🎡','slide|горка|🛝','playground|детская площадка|🛝','computer|компьютер|💻','camera|камера|📷','present|подарок|🎁',
  ])},
  { id: 'actions', title: 'Действия', emoji: '✨', color: '#39b5a6', words: words([
    'go|идти|🚶‍♀️','come|приходить|👋','run|бежать|🏃‍♀️','jump|прыгать|🤸‍♀️','sit|сидеть|🪑','stand|стоять|🧍‍♀️','sleep|спать|😴','wake up|просыпаться|⏰','eat|есть|😋','drink|пить|🥤','read|читать|📖','write|писать|✍️','speak|говорить|💬','listen|слушать|👂','look|смотреть|👀','play|играть|🎮','sing|петь|🎤','dance|танцевать|💃','draw|рисовать|🖍️','help|помогать|🤝',
  ])},
  { id: 'feelings', title: 'Чувства', emoji: '💖', color: '#ff6f91', words: words([
    'happy|счастливый|😊','sad|грустный|😢','angry|сердитый|😠','afraid|испуганный|😨','surprised|удивлённый|😮','tired|уставший|😴','hungry|голодный|😋','thirsty|хочется пить|🥤','bored|скучающий|🥱','excited|взволнованный|🤩','calm|спокойный|😌','kind|добрый|🥰','brave|смелый|🦸‍♀️','shy|застенчивый|☺️','proud|гордый|😎','worried|обеспокоенный|😟','love|любовь|❤️','smile|улыбка|😄','laugh|смеяться|😂','cry|плакать|😭',
  ])},
  { id: 'city', title: 'Город', emoji: '🏙️', color: '#7889aa', words: words([
    'city|город|🏙️','street|улица|🛣️','park|парк|🌳','shop|магазин|🏪','market|рынок|🛒','school|школа|🏫','hospital|больница|🏥','bank|банк|🏦','post office|почта|📮','library|библиотека|📚','museum|музей|🏛️','cinema|кинотеатр|🎬','cafe|кафе|☕','restaurant|ресторан|🍽️','hotel|отель|🏨','zoo|зоопарк|🦁','bridge|мост|🌉','square|площадь|🏙️','playground|детская площадка|🛝','supermarket|супермаркет|🛒',
  ])},
  { id: 'time', title: 'Время и календарь', emoji: '🗓️', color: '#6576c8', words: words([
    'time|время|⏰','day|день|☀️','week|неделя|🗓️','month|месяц|📅','year|год|🎆','today|сегодня|📍','tomorrow|завтра|➡️','yesterday|вчера|⬅️','morning|утро|🌅','afternoon|день|🌞','evening|вечер|🌇','night|ночь|🌙','Monday|понедельник|1️⃣','Tuesday|вторник|2️⃣','Wednesday|среда|3️⃣','Thursday|четверг|4️⃣','Friday|пятница|5️⃣','Saturday|суббота|6️⃣','Sunday|воскресенье|7️⃣','birthday|день рождения|🎂',
  ])},
]

export const TOTAL_WORDS = groups.reduce((total, group) => total + group.words.length, 0)
