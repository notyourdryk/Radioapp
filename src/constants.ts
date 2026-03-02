export interface Station {
  id: string;
  name: string;
  genre: string;
  city: string;
  logo: string;
  streamUrl: string;
  bitrate: string;
  description?: string;
  color?: string;
  nowPlaying?: {
    artist: string;
    title: string;
    image?: string;
  };
}

export const GENRES = ['Поп', 'Танцевальная', 'Новости', 'Релакс', 'Джаз', 'Рок', 'Лаунж', 'Ретро', 'Классика'];
export const CITIES = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону'];

export const MOCK_STATIONS: Station[] = [
  {
    id: '1',
    name: 'Европа Плюс',
    genre: 'Поп',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Европа+Плюс&background=3b82f6&color=fff&size=400',
    streamUrl: 'https://ep128.hostingradio.ru:8030/ep128',
    bitrate: '128kbps',
    description: 'Главные хиты современности и лучшие новинки поп-музыки.',
    color: '#3b82f6',
    nowPlaying: { artist: 'Dua Lipa', title: 'Houdini', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '2',
    name: 'Радио Рекорд',
    genre: 'Танцевальная',
    city: 'Санкт-Петербург',
    logo: 'https://ui-avatars.com/api/?name=Радио+Рекорд&background=f97316&color=fff&size=400',
    streamUrl: 'https://online.radiorecord.ru:8101/rr_128',
    bitrate: '128kbps',
    description: 'Первая танцевальная радиостанция России.',
    color: '#f97316',
    nowPlaying: { artist: 'David Guetta', title: 'I\'m Good', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '3',
    name: 'Business FM',
    genre: 'Новости',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Business+FM&background=ef4444&color=fff&size=400',
    streamUrl: 'https://bfm.hostingradio.ru:8004/fm',
    bitrate: '64kbps',
    description: 'Первое деловое радио в России.',
    color: '#ef4444',
    nowPlaying: { artist: 'Бизнес Новости', title: 'Обзор рынков', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '4',
    name: 'Relax FM',
    genre: 'Релакс',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Relax+FM&background=8b5cf6&color=fff&size=400',
    streamUrl: 'https://relax.hostingradio.ru:8000/relax128.mp3',
    bitrate: '128kbps',
    description: 'Спокойная музыка для отдыха и релаксации.',
    color: '#8b5cf6',
    nowPlaying: { artist: 'Ludovico Einaudi', title: 'Experience' }
  },
  {
    id: '5',
    name: 'Радио Джаз',
    genre: 'Джаз',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Радио+Джаз&background=10b981&color=fff&size=400',
    streamUrl: 'https://radiojazz.hostingradio.ru:8000/jazz128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Miles Davis', title: 'So What' }
  },
  {
    id: '6',
    name: 'Наше Радио',
    genre: 'Рок',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Наше+Радио&background=eab308&color=fff&size=400',
    streamUrl: 'https://nashe.hostingradio.ru:80/nashe-128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Кино', title: 'Группа Крови', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '7',
    name: 'Вести FM',
    genre: 'Новости',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Вести+FM&background=06b6d4&color=fff&size=400',
    streamUrl: 'https://icecast.vgtrk.cdnvideo.ru/vestifm_mp3_192kbps',
    bitrate: '192kbps',
    nowPlaying: { artist: 'Вести', title: 'Прямой эфир', image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '8',
    name: 'Монте-Карло',
    genre: 'Лаунж',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Монте-Карло&background=f43f5e&color=fff&size=400',
    streamUrl: 'https://montecarlo.hostingradio.ru:8000/montecarlo128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Sade', title: 'Smooth Operator' }
  },
  {
    id: '9',
    name: 'Ретро FM',
    genre: 'Ретро',
    city: 'Казань',
    logo: 'https://ui-avatars.com/api/?name=Ретро+FM&background=8b5cf6&color=fff&size=400',
    streamUrl: 'https://retro.hostingradio.ru:8000/retro128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'ABBA', title: 'Dancing Queen', image: 'https://images.unsplash.com/photo-1516280440502-a2fc9979b208?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '10',
    name: 'Радио Классик',
    genre: 'Классика',
    city: 'Новосибирск',
    logo: 'https://ui-avatars.com/api/?name=Classic&background=111&color=fff&size=400',
    streamUrl: 'https://classic.hostingradio.ru:8000/classic128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Mozart', title: 'Symphony No. 40' }
  },
  {
    id: '11',
    name: 'DFM',
    genre: 'Танцевальная',
    city: 'Екатеринбург',
    logo: 'https://ui-avatars.com/api/?name=DFM&background=ec4899&color=fff&size=400',
    streamUrl: 'https://dfm.hostingradio.ru:8000/dfm128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Tiësto', title: 'The Business', image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '12',
    name: 'Радио Energy',
    genre: 'Поп',
    city: 'Самара',
    logo: 'https://ui-avatars.com/api/?name=Радио+Energy&background=14b8a6&color=fff&size=400',
    streamUrl: 'https://energy.hostingradio.ru:8000/energy128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'The Weeknd', title: 'Blinding Lights' }
  },
  {
    id: '13',
    name: 'Like FM',
    genre: 'Поп',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Like+FM&background=e11d48&color=fff&size=400',
    streamUrl: 'https://like.hostingradio.ru:8000/like128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Miley Cyrus', title: 'Flowers', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f92f?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '14',
    name: 'Радио Романтика',
    genre: 'Релакс',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Радио+Романтика&background=f43f5e&color=fff&size=400',
    streamUrl: 'https://romantika.hostingradio.ru:8000/romantika128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Adele', title: 'Easy On Me' }
  },
  {
    id: '15',
    name: 'Авторадио',
    genre: 'Поп',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Авторадио&background=f97316&color=fff&size=400',
    streamUrl: 'https://avto.hostingradio.ru:8000/avto128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Zivert', title: 'Beverly Hills', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '16',
    name: 'Comedy Radio',
    genre: 'Лаунж',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Comedy+Radio&background=ef4444&color=fff&size=400',
    streamUrl: 'https://comedy.hostingradio.ru:8000/comedy128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Comedy Club', title: 'Лучшие моменты' }
  },
  {
    id: '17',
    name: 'Радио Maximum',
    genre: 'Рок',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Радио+Maximum&background=eab308&color=fff&size=400',
    streamUrl: 'https://maximum.hostingradio.ru:8000/maximum128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Linkin Park', title: 'Numb', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '18',
    name: 'Хит FM',
    genre: 'Поп',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Хит+FM&background=3b82f6&color=fff&size=400',
    streamUrl: 'https://hit.hostingradio.ru:8000/hit128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Harry Styles', title: 'As It Was' }
  },
  {
    id: '19',
    name: 'Русское Радио',
    genre: 'Поп',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Русское+Радио&background=ec4899&color=fff&size=400',
    streamUrl: 'https://russkoe.hostingradio.ru:8000/russkoe128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Полина Гагарина', title: 'Вчера', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '20',
    name: 'Радио Дача',
    genre: 'Ретро',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Радио+Дача&background=10b981&color=fff&size=400',
    streamUrl: 'https://dacha.hostingradio.ru:8000/dacha128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Юрий Шатунов', title: 'Белые розы' }
  },
  {
    id: '21',
    name: 'Love Radio',
    genre: 'Поп',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Love+Radio&background=f43f5e&color=fff&size=400',
    streamUrl: 'https://love.hostingradio.ru:8000/love128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Justin Bieber', title: 'Ghost', image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '22',
    name: 'Радио Шансон',
    genre: 'Ретро',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Радио+Шансон&background=8b5cf6&color=fff&size=400',
    streamUrl: 'https://shanson.hostingradio.ru:8000/shanson128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Михаил Круг', title: 'Владимирский централ' }
  },
  {
    id: '23',
    name: 'Дорожное Радио',
    genre: 'Ретро',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Дорожное+Радио&background=06b6d4&color=fff&size=400',
    streamUrl: 'https://dorozhnoe.hostingradio.ru:8000/dorozhnoe128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Стас Михайлов', title: 'Всё для тебя', image: 'https://images.unsplash.com/photo-1520872024865-3ff2805d8bb3?q=80&w=400&auto=format&fit=crop' }
  },
  {
    id: '24',
    name: 'Радио Культура',
    genre: 'Классика',
    city: 'Москва',
    logo: 'https://ui-avatars.com/api/?name=Радио+Культура&background=64748b&color=fff&size=400',
    streamUrl: 'https://kultura.hostingradio.ru:8000/kultura128.mp3',
    bitrate: '128kbps',
    nowPlaying: { artist: 'Чайковский', title: 'Лебединое озеро' }
  }
];
