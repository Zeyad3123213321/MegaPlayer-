class MegaPlayer {
    constructor() {
        this.audio = new Audio();
        this.playlist = [];
        this.likedSongs = [];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.isRepeated = false;
        this.volume = 0.7;
        this.originalPlaylist = [];
        this.sections = ['home', 'browse', 'library', 'liked', 'playlists', 'settings', 'upload', 'radio', 'podcasts', 'stats', 'game', 'discover'];
        this.theme = 'dark';
        this.fontSize = 16;
        this.notificationsEnabled = true;
        this.visualizerEnabled = false;
        this.lyricsEnabled = true;
        this.sleepTimer = null;
        this.achievements = [];
        this.userStats = {
            songsPlayed: 0,
            listeningTime: 0,
            artistsDiscovered: 0,
            genresExplored: 0
        };
        this.initializePlayer();
        this.loadSampleData();
        this.setupEventListeners();
        this.renderUI();
        this.loadSettings();
        this.setupVisualizer();
    }

    initializePlayer() {
        this.audio.volume = this.volume;
        this.setupAudioEvents();
    }

    setupAudioEvents() {
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.handleTrackEnd());
        this.audio.addEventListener('volumechange', () => this.updateVolumeUI());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('play', () => this.handlePlayEvent());
        this.audio.addEventListener('pause', () => this.handlePauseEvent());
    }

    loadSampleData() {
        this.playlist = [
            {
                title: "Make you mine",
                artist: "Madison Beer",
                duration: "4:15",
                url: "Music/Make you mine.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUgOrM_nNjHaR0RThAr9PJv9BSDeNv5PcNfP_BgLmP4eKdA_75dS_ow1AcwUwYUDJPcU&usqp=CAU",
                genre: "Pop",
                plays: 124,
                bpm: 120,
                releaseYear: 2022,
                lyrics: "[Verse 1]\nI wanna be your favorite thing\nOh, baby, everything\nYou make me feel like I'm enough\nWhen I'm with you, I'm not giving up"
            },

            {
                title: "Sweet Relief",
                artist: "Madison Beer",
                duration: "4:15",
                url: "Music/Madison Beer - Sweet Relief.mp3",
                artwork: "https://www.rollingstone.com/wp-content/uploads/2023/10/Madison-Beer-Sweet-Relief-Music-Video-Madison-Beer-Sweet-Relief-Music-Video.jpg?w=1581&h=1054&crop=1",
                genre: "Pop",
                plays: 124,
                bpm: 120,
                releaseYear: 2022,
                lyrics: "[Verse 1]\nI wann be your favorite thing\nOh, baby, everything\nYou make me feel like I'm enough\nWhen I'm with you, I'm not giving up"
            },

            {
                title: "Mockingbird",
                artist: "Eminem",
                duration: "4:11",
                url: "Music/Eminem - Mockingbird.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRneCLGDb0dzQc-ufX9ELgDNzbvYaBGA7oAyw&s",
                genre: "Rock",
                plays: 167,
                bpm: 105,
                releaseYear: 2020,
                lyrics: "[Verse 1]\nYeah, I know sometimes things may not always make sense to you right now\nBut hey, what daddy always tell you?\nStraighten up little soldier\nStiffen up that upper lip"
            },

            {
                title: "Tourner Dans Le Vide",
                artist: "Indila",
                duration: "3:56",
                url: "Music/Indila - Tourner Dans Le Vide (Official Music Video).mp3",
                artwork: "https://i1.sndcdn.com/artworks-000119625940-j1zo58-t500x500.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Dernière Danse",
                artist: "Indila",
                duration: "3:56",
                url: "Music/Indila - Dernière Danse (Clip Officiel).mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMIouOTzDFmYhUobD9RrYDoudvZY9fe1VKZw&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "NF - The Search",
                artist: "NF",
                duration: "4:50",
                url: "Music/NF - The Search.mp3",
                artwork: "https://images.squarespace-cdn.com/content/v1/58ab2fce20099e7487a18b2a/1559279673300-ENYFLGS82QV4PEMLAW0M/NF_pdx_1350x500.jpg?format=2500w",
                genre: "Rock",
                plays: 112,
                bpm: 140,
                releaseYear: 2019,
                lyrics: "[Intro]\nHey, Nate, how's life?\nI don't know, it's alright\nI've been dealin' with some things like every human being\nAnd really didn't sleep much last night (last night)"
            },


            {
                title: "Sh-Boom",
                artist: "The Chords ",
                duration: "2:58",
                url: "Music/The Chords - Sh-Boom.mp3",
                artwork: "https://cdn-images.dzcdn.net/images/cover/4d0f244849bb15fabb3dc0633e18a5b0/1900x1900-000000-80-0-0.jpg",
                genre: "Electronic",
                plays: 76,
                bpm: 128,
                releaseYear: 2020,
                lyrics: "[Verse 1]\nWay down we go\nWay down we go\nSay, way down we go\nWay down we go"
            },

            {
                title: "Live Code Be Dream",
                artist: "Car 1",
                duration: "4:30",
                url: "Music/Live Code Be Dream.mp3",
                artwork: "https://www.svgrepo.com/show/303311/disney-and-pixar-cars-logo.svg",
                genre: "Electronic",
                plays: 87,
                bpm: 90,
                releaseYear: 2022,
                lyrics: "[Verse 1]\nDreaming of a life\nWhere everything is right\nCoding through the night\nMaking dreams take flight"
            },

            // NEW MUSIC


            {
                title: "Journey",
                artist: "Mark Eliyahu",
                duration: "3:56",
                url: "Music/Mark Eliyahu - Journey (Official Video).mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNKr_1qf0Z5zXUEAZYx3BMkk_w8i-IkZGR-A&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Despacito ft. Daddy Yankee",
                artist: "Luis Fonsi",
                duration: "3:56",
                url: "Music/Luis Fonsi - Despacito ft. Daddy Yankee.mp3",
                artwork: "https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "سُنة الحياة",
                artist: "حسين الجسمي",
                duration: "3:56",
                url: "Music/حسين الجسمي -  سُنة الحياة (اورنج رمضان 2020).mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUah_zA6u1DTit-s3hTfKiLZT_nuK7sE7lhQ&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Ego (Clip Officiel)",
                artist: "Willy William",
                duration: "3:56",
                url: "Music/Willy William - Ego (Clip Officiel).mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAevoo-ifH9_Dxkc-uLc8LzvYbeUomVEfpoA&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Algani Baad Yomen",
                artist: "Samira Said",
                duration: "3:56",
                url: "Music/Samira Said - Algani Baad Yomen _ 1984 _ سميرة سعيد - قال جاني بعد يومين.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJv3FskTqtfcPBLoe-354cSB4C2ASSHIjgxw&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "MATKHAFESH YAMMA",
                artist: "ALI LOKA",
                duration: "3:56",
                url: "Music/ALI LOKA - MATKHAFESH YAMMA _ على لوكا - متخافيش ياما ( ولا فارقه معايا الناس مين سالك مين بصاص ).mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLFzmKR6DE89-BLZTzseBjQU-8hZ-Y2Gv_Aw&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Zahra Heya",
                artist: "عسيلي و رزان",
                duration: "3:56",
                url: "Music/اعلان   زهره هي  من مجموعة المرشدي - عسيلي و رزان - رمضان 2023.mp3",
                artwork: "https://i1.sndcdn.com/artworks-pWNVk1dlKkdLplhw-eHEKnw-t1080x1080.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Boshret Kheir",
                artist: "Hussain Al Jassmi",
                duration: "3:56",
                url: "Music/حسين الجسمي - بشرة خير (فيديو كليب) _ Hussain Al Jassmi - Boshret Kheir _ 2014.mp3",
                artwork: "https://i1.sndcdn.com/artworks-000147625414-gec181-t500x500.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "عمر أفندي",
                artist: "عمر أفندي",
                duration: "3:56",
                url: "Music/أغنية _لولاش_ _ عمر أفندي _ شاهد.mp3",
                artwork: "https://shahid.mbc.net/mediaObject/2024/AMR-EID/PosterAR_Omar_Affendi0/original/PosterAR_Omar_Affendi.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },
            {
                title: "El Hob Gany",
                artist: "TUL8TE",
                duration: "3:56",
                url: "Music/TUL8TE - El Hob Gany I تووليت - الحب جاني.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrUQo0Gp1ALez7h4XmQszHEIcPBY_rc4ZKMA&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Haygely Mawgow3",
                artist: "Tamer Ashour",
                duration: "3:56",
                url: "Music/Tamer Ashour - Haygely Mawgow3 _ تامر عاشور - هيجيلي موجوع.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4htFVENeOJ37-j7yfCjeRPsD5aZkExqHfOA&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Batmanna Ansak",
                artist: "Sherine",
                duration: "3:56",
                url: "Music/Sherine - Batmanna Ansak _ شيرين - بتمنى أنساك.mp3",
                artwork: "https://i1.sndcdn.com/artworks-7C0wc0SEqhD4P2Gx-XgZH8Q-t500x500.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "LM3ALLEM",
                artist: "Saad Lamjarred",
                duration: "3:56",
                url: "Music/Saad Lamjarred - LM3ALLEM (Exclusive Music Video) _  (سعد لمجرد - لمعلم (فيديو كليب حصري.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6_uaEsDV0x-YqsZlR8emRK6VusILdfBKz_w&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "ADDA ELKALAM",
                artist: "Saad Lamjarred",
                duration: "3:56",
                url: "Music/Saad Lamjarred - ADDA ELKALAM (EXCLUSIVE Music Video) _ 2020 _ (سعد لمجرد - عدى الكلام (فيديو كليب.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Dou9B_tuaDCZnnoFO77T9a4cczCdd_0x9g&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Lessa Bahinlha",
                artist: "Ramy Essam",
                duration: "3:56",
                url: "Music/Ramy Essam - Lessa Bahinlha رامى عصام - لسه بحنلها.mp3",
                artwork: "https://cdn-images.dzcdn.net/images/cover/e576d31e5b75daa9424b276da5cbaf42/0x1900-000000-80-0-0.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Zahra",
                artist: "Morshedy Group",
                duration: "3:56",
                url: "Music/Morshedy Group _ Zahra.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4OSkaF_ZDiRb5RJBdL2qJ9QmY7pFXWRrwTQ&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "C'Est La Vie",
                artist: "Khaled",
                duration: "3:56",
                url: "Music/Khaled - C'Est La Vie.mp3",
                artwork: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Claude_-_C%27est_la_vie_cover_art.jpg/250px-Claude_-_C%27est_la_vie_cover_art.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Fady Shewaya",
                artist: "Hamza Namira",
                duration: "3:56",
                url: "Music/Hamza Namira - Fady Shewaya _ حمزة نمرة - فاضي شوية.mp3",
                artwork: "https://i1.sndcdn.com/artworks-fSgv2C8R0WRfRmBL-FE9hpg-t500x500.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Dari Ya Alby",
                artist: "Hamza Namira",
                duration: "3:56",
                url: "Music/Hamza Namira - Dari Ya Alby _ حمزة نمرة - داري يا قلبي.mp3",
                artwork: "https://i1.sndcdn.com/artworks-000299447418-6z909k-t1080x1080.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Shape of You",
                artist: "Ed Sheeran",
                duration: "3:56",
                url: "Music/Ed Sheeran - Shape of You (Official Music Video).mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQsUc_Ta8jJoujVC2okyZWPMFdfXhklicI8Q&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Sahby Ya Sahby",
                artist: "Bahaa Sultan",
                duration: "3:56",
                url: "Music/Bahaa Sultan - Sahby Ya Sahby (Lyric Video) _ بهاء سلطان - صحبي يا صحبي (فيديو مع الكلمات).mp3",
                artwork: "https://i1.sndcdn.com/artworks-vvf1aJtkVJiRH8vx-Bn67LA-t500x500.png",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "Wasa3 Wasa3",
                artist: "Ahmed Saad",
                duration: "3:56",
                url: "Music/Ahmed Saad - Wasa3 Wasa3 _ Official Music Video - 2022 _ احمد سعد - وسع وسع.mp3",
                artwork: "https://i.scdn.co/image/ab67616d0000b27348752247a8292e74197edfe5",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: " Wa'fet Nasyt Zaman",
                artist: "Ahmed Mekky",
                duration: "3:56",
                url: "Music/Ahmed Mekky - Wa'fet Nasyt Zaman (Exclusive Music Video) _  أحمد مكى - وقفة ناصية زمان.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6eKxpTzUnJGSnVeMaOr5QhT4JyG4PX2U-HA&s",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            {
                title: "شو حلو",
                artist: "زباد برجي",
                duration: "3:56",
                url: "Music/_زياد برجي -  شو حلو (فيلم  بالغلط).mp3",
                artwork: "https://i1.sndcdn.com/artworks-UuY7GfWYBEHfk2Wj-nIAtyQ-t500x500.jpg",
                genre: "Jazz",
                plays: 78,
                bpm: 125,
                releaseYear: 2022,
                lyrics: "Wow"
            },

            // END OF THE NEW MUSIC

            {
                title: "UP",
                artist: "Pixar",
                duration: "4:20",
                url: "Music/Married Life.mp3",
                artwork: "https://lumiere-a.akamaihd.net/v1/images/p_up_19753_e6f911e3.jpeg?region=0%2C0%2C540%2C810",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2019,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },

            {
                title: "Ratatouille",
                artist: "Pixar",
                duration: "4:20",
                url: "Music/Le Festin- Camille (Ratatouille Soundtrack).mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGp8q-NX7XFkHytQR1tSMWh4nSKS6g-egu_Q&s",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2019,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },

            {
                title: "Tarzan",
                artist: "Disney",
                duration: "4:20",
                url: "Music/Tarzan.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEsDDU8FpY9-poU5iK0xYkWJK7SOcd4kEsZQ&s",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2019,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },


            {
                title: "Spirit Stallion",
                artist: "Pixar",
                duration: "4:20",
                url: "Music/Spirit Stallion.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl3Pba-AiaK1vIUHqhKBk47lW5W_LvGdZR1g&s",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2019,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },

            {
                title: "شارة العمل",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/سبيستون _ Little Battler Experience S1 _ شارة العمل.mp3",
                artwork: "https://media.senscritique.com/media/000013551370/0/lbx_little_battlers_experience.jpg",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2019,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },

            {
                title: "بداية بليزين تينز",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/أغنية بداية بليزين تينز - سبيستون 🎵  Blazing Teens - Spacetoon.mp3",
                artwork: "https://s1.dmcdn.net/v/SADl41VYda9divT7S/x120",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2019,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },

            {
                title: "بداية توب بليت",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/أغنية بداية توب بليت - سبيستون _ Top Plate - Spacetoon.mp3",
                artwork: "https://i1.sndcdn.com/artworks-000132650616-5xb9ya-t500x500.jpg",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2019,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },

            {
                title: "دراغون بول",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/أغنية بداية دراغون بول - سبيستون 🎵 Dragon Ball - Spacetoon.mp3",
                artwork: "https://i.ebayimg.com/00/s/MTYwMFgxMTEy/z/~v4AAOSw6CBcu5Gn/$_57.JPG?set_id=8800005007",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2019,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },

            {
                title: "عهد الأصدقاء",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/أغنية بداية عهد الأصدقاء - سبيستون 🎵 Spacetoon.mp3",
                artwork: "https://image.tmdb.org/t/p/original/7sNRgaXvRgIYvvuJRsAIfwidCUm.jpg",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 1956,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },

            {
                title: "ون بيس",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/-  أغنية بداية ون بيس - سبيستون 🎵 One piece - Spacetoon.mp3",
                artwork: "https://upload.wikimedia.org/wikipedia/ar/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2001,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },

            {
                title: "المحقق كونان قديمة",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/اغنية بداية المحقق كونان - اغاني كرتون قديمة.mp3",
                artwork: "https://conanaraby.com/wp-content/uploads/2025/12/%D8%A7%D9%84%D9%85%D8%AD%D9%82%D9%82-%D9%83%D9%88%D9%86%D8%A7%D9%86-%D8%A7%D9%84%D8%AC%D8%B2%D8%A1-%D8%A7%D9%84%D8%A3%D9%88%D9%84-%D9%85%D8%AF%D8%A8%D9%84%D8%AC-%D8%A8%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A-552x775.jpg",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2001,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },
            {
                title: "المحقق كونان الجيدا",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/أغنية بداية المحقق كونان الجزء العاشر - Detective Conan  على سبيستون 2023.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVT8ORlIS1i9ehHGDh442ciytrixV_TYBJhA&s",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2001,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },
            {
                title: "أبطال الكرة الجزء الثاني",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/Spacetoon _ سبيستون - أبطال الكرة الجزء الثاني - شارة العمل.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk7-G7CNZnCZaPPSDg7d-9NkRfOUO1ML_sAQ&s",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2005,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },
            {
                title: "جرندايزر",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/أغنية بداية جرندايزر - سبيستون 🎵 Grendizer - SpaceToon.mp3",
                artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8n1My_zBm_1j_3SeSdEhfKbbz2BT3CJSFLQ&s",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 1950,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },
            {
                title: "بي باتل",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/أغنية بداية بي باتل  - سبيستون 🎵 BeyBattle Burst  - Spacetoon.mp3",
                artwork: "https://img.wattpad.com/cover/374029506-256-k214785.jpg",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 1999,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },
            {
                title: "درايمون",
                artist: "سبيستون",
                duration: "4:20",
                url: "Music/درايمون شاره البدايه لصاحبه الحنجره الذهبيه رشا رزق.mp3",
                artwork: "https://www.ooanime.com/files/170_16-04-2020_%D8%B9%D8%A8%D9%82%D9%88%D8%B1.jpg",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2000,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },
            {
                title: "Meet the Robinsons",
                artist: "Disney",
                duration: "4:20",
                url: "Music/Meet the Robinsons.mp3",
                artwork: "https://m.arabseed.show/wp-content/uploads/2021/09/%D9%81%D9%8A%D9%84%D9%85-%D8%B9%D8%A7%D8%A6%D9%84%D8%A9-%D8%B1%D9%88%D8%A8%D8%B3%D9%88%D8%B3-Meet-the-Robinsons-2007-%D9%85%D8%AF%D8%A8%D9%84%D8%AC.jpg",
                genre: "Cartoon Song",
                plays: 92,
                bpm: 95,
                releaseYear: 2019,
                lyrics: "[Verse 1]\nBreeze blowing through my hair\nSunshine everywhere\nFeeling light without a care\nMusic in the air"
            },
        ];
        this.originalPlaylist = [...this.playlist];
        // Load liked songs from localStorage if available
        const savedLikes = localStorage.getItem('megaPlayerLikedSongs');
        if (savedLikes) {
            this.likedSongs = JSON.parse(savedLikes);
        }

        // Load user stats
        const savedStats = localStorage.getItem('megaPlayerStats');
        if (savedStats) {
            this.userStats = JSON.parse(savedStats);
        }

        // Load achievements
        const savedAchievements = localStorage.getItem('megaPlayerAchievements');
        if (savedAchievements) {
            this.achievements = JSON.parse(savedAchievements);
        } else {
            // Default achievements
            this.achievements = [
                { id: 1, name: "First Listen", description: "Play your first song", progress: 100, completed: true },
                { id: 2, name: "Music Lover", description: "Like 50 songs", progress: 75, completed: false },
                { id: 3, name: "World Traveler", description: "Listen to music from 10 different countries", progress: 40, completed: false },
                { id: 4, name: "Marathon Listener", description: "Listen for 24 hours straight", progress: 15, completed: false }
            ];
        }
    }

    setupEventListeners() {
        // Player controls
        document.querySelector('.play-pause-btn').addEventListener('click', () => {
            this.togglePlay();
            this.showNotification('Playback ' + (this.isPlaying ? 'started' : 'paused'));
        });

        document.querySelector('.next-btn').addEventListener('click', () => {
            this.nextTrack();
            this.showNotification('Skipping to next track');
        });

        document.querySelector('.prev-btn').addEventListener('click', () => {
            this.prevTrack();
            this.showNotification('Going back to previous track');
        });

        document.querySelector('.volume-slider').addEventListener('input', (e) => {
            this.setVolume(e.target.value);
            this.showNotification('Volume adjusted to ' + Math.round(e.target.value * 100) + '%');
        });

        document.querySelector('.shuffle-btn').addEventListener('click', () => {
            this.toggleShuffle();
            this.showNotification('Shuffle ' + (this.isShuffled ? 'enabled' : 'disabled'));
        });

        document.querySelector('.repeat-btn').addEventListener('click', () => {
            this.toggleRepeat();
            this.showNotification('Repeat ' + (this.isRepeated ? 'enabled' : 'disabled'));
        });

        document.querySelector('.progress-container').addEventListener('click', (e) => this.seek(e));

        // Navigation
        document.getElementById('search-input').addEventListener('input', (e) => this.handleSearch(e.target.value));

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
                this.showNotification('Navigating to ' + section);

                // Update active state
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        document.querySelectorAll('.genre-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const genre = e.currentTarget.dataset.genre;
                this.displaySongsByGenre(genre);
                this.showNotification('Showing ' + genre + ' songs');
            });
        });

        // Settings
        document.getElementById('theme-select').addEventListener('change', (e) => {
            this.setTheme(e.target.value);
            this.showNotification('Theme changed to ' + e.target.value);
        });

        document.getElementById('font-size-slider').addEventListener('input', (e) => {
            this.setFontSize(e.target.value);
            this.showNotification('Font size adjusted');
        });

        document.getElementById('notification-toggle').addEventListener('change', (e) => {
            this.toggleNotifications(e.target.checked);
            this.showNotification('Notifications ' + (e.target.checked ? 'enabled' : 'disabled'));
        });

        document.querySelector('.save-settings-btn').addEventListener('click', () => {
            this.saveSettings();
            this.showNotification('Settings saved successfully');
        });

        // Custom color pickers
        document.getElementById('primary-color-input').addEventListener('change', () => {
            this.setCustomColors();
            this.showNotification('Primary color changed');
        });

        document.getElementById('secondary-color-input').addEventListener('change', () => {
            this.setCustomColors();
            this.showNotification('Secondary color changed');
        });

        // Upload form
        document.querySelector('.form-submit').addEventListener('click', () => {
            this.uploadSong();
        });

        // Mobile menu toggle
        document.querySelector('.menu-toggle').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('active');
        });

        // Sleep timer
        document.querySelectorAll('.timer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const minutes = parseInt(e.target.textContent);
                this.setSleepTimer(minutes);
                this.showNotification('Sleep timer set for ' + minutes + ' minutes');

                // Update UI
                document.querySelectorAll('.timer-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Easter egg (triple click on logo)
        document.querySelector('.logo').addEventListener('click', (e) => {
            if (!this.logoClicks) this.logoClicks = 0;
            this.logoClicks++;

            if (this.logoClicks >= 3) {
                this.activateEasterEgg();
                this.logoClicks = 0;
            }

            setTimeout(() => { this.logoClicks = 0; }, 9000);
        });

        // Visualizer toggle
        document.querySelector('[title="Visualizer"]').addEventListener('click', () => {
            this.toggleVisualizer();
        });

        // Lyrics toggle
        document.querySelector('[title="Lyrics"]').addEventListener('click', () => {
            this.toggleLyrics();
        });

        // Add to playlist
        document.querySelector('[title="Add to Playlist"]').addEventListener('click', () => {
            this.showAddToPlaylistDialog();
        });

        // Mini player
        document.querySelector('.mini-player-close').addEventListener('click', () => {
            document.querySelector('.mini-player').classList.remove('active');
        });

        // Audio presets
        document.querySelectorAll('.audio-preset').forEach(preset => {
            preset.addEventListener('click', (e) => {
                const presetName = e.target.dataset.preset;
                this.applyAudioPreset(presetName);
                this.showNotification('Audio preset applied: ' + presetName);

                // Update UI
                document.querySelectorAll('.audio-preset').forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Equalizer sliders
        document.getElementById('eq-low').addEventListener('input', (e) => {
            this.adjustEqualizer('low', e.target.value);
        });

        document.getElementById('eq-mid').addEventListener('input', (e) => {
            this.adjustEqualizer('mid', e.target.value);
        });

        document.getElementById('eq-high').addEventListener('input', (e) => {
            this.adjustEqualizer('high', e.target.value);
        });

        // Data management
        document.getElementById('export-data').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('import-data').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });

        document.getElementById('clear-data').addEventListener('click', () => {
            this.clearData();
        });
    }

    renderUI() {
        this.renderRecentlyPlayed();
        this.renderPopularArtists();
        this.renderFeaturedAlbums();
        this.renderPlaylists();
        this.renderLikedSongs();
        this.renderLibraryViews();
        this.renderStats();
        this.renderAchievements();
    }

    renderRecentlyPlayed() {
        const container = document.querySelector('.recently-played-grid');
        container.innerHTML = '';
        const recentSongs = this.playlist.slice(0, 100);

        recentSongs.forEach(song => {
            const isLiked = this.likedSongs.includes(song.url);
            const card = this.createSongCard(song, isLiked);
            container.appendChild(card);
        });
    }

    renderPopularArtists() {
        const container = document.querySelector('.popular-artists-grid');
        container.innerHTML = '';
        const artists = [
            { name: 'Madison Beer', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXx1gpgn2rCpW6AUOhn0WOoc3Sy_XCwM2W2Q&s' },
            { name: 'Eminem', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRneCLGDb0dzQc-ufX9ELgDNzbvYaBGA7oAyw&s' },
            { name: 'Amr Diab', artwork: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8wtbGxqBjrKYQbJtET50xmeFXQYvy_Tg-O5D2lM2lNLlVRFnUCyk4FEBHFFn_i2Vqg7BU1YMBZTPPEdhB-9raS1DKw1CP_j0toAlkiM8' },
            { name: 'Mohamed Hamaki', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9lhyxjLhQQ0DFSz8a_JUTU5ZWUhKpkiI48g&s' },
            { name: 'NF', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCNj6Yg3YzPwstuv-Jk3fUvOmijQxxzC0Xig&s' },

            { name: 'Ahmed Mekky', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4oiJJai9TdlWoM87cQks6xB_t4Lnc_4teQ&s' },
            { name: 'Ahmed Saad', artwork: 'https://viberate-upload.ams3.cdn.digitaloceanspaces.com/prod/entity/artist/ahmed-saad-ec0en' },
            { name: 'ALI LOKA', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvdpB3aRlhHYFQ6M9L34QsEXREyVIMBR6Bjg&s' },
            { name: 'Bahaa Sultan', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3NmVwqoEZkXbto4fRRttoUmlslMQXJOQRBw&s' },
            { name: 'Ed Sheeran', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQosXorhydu5a1xKXfZyVZr34TQM3wADo7QaQ&s' },
        ];

        artists.forEach(artist => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                        <div class="album-art" style="background-image: url('${artist.artwork}')"></div>
                        <h3>${artist.name}</h3>
                    `;
            container.appendChild(card);
        });
    }

    renderFeaturedAlbums() {
        const container = document.querySelector('.featured-albums-grid');
        container.innerHTML = '';
        const albums = [
            { title: 'شوقنا', artist: 'Amr Diab', artwork: 'https://i1.sndcdn.com/artworks-CPNTsU2obRmi-0-t500x500.jpg' },
            { title: 'The Search', artist: 'NF', artwork: 'https://images.squarespace-cdn.com/content/v1/58ab2fce20099e7487a18b2a/1559279673300-ENYFLGS82QV4PEMLAW0M/NF_pdx_1350x500.jpg?format=2500w' },
            { title: 'Skyfall', artist: 'Adele', artwork: 'https://c.saavncdn.com/632/Skyfall-Full-Length--English-2012-20191009171950-500x500.jpg' },
            { title: 'Mockingbird', artist: 'Eminem', artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRneCLGDb0dzQc-ufX9ELgDNzbvYaBGA7oAyw&s' },
            { title: 'Hotline Bling', artist: 'Drake', artwork: 'https://a10.gaanacdn.com/gn_img/albums/qaLKY623pO/LKYAO4LPKp/size_m.jpg' }
        ];

        albums.forEach(album => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                        <div class="album-art" style="background-image: url('${album.artwork}')"></div>
                        <h3>${album.title}</h3>
                        <p>${album.artist}</p>
                    `;
            container.appendChild(card);
        });
    }

    renderPlaylists() {
        const container = document.querySelector('.user-playlists-grid');
        container.innerHTML = '';

        this.playlist.forEach((song) => {
            const isLiked = this.likedSongs.includes(song.url);
            const card = this.createSongCard(song, isLiked);
            container.appendChild(card);
        });
    }

    renderLikedSongs() {
        const container = document.querySelector('.liked-songs-grid');
        container.innerHTML = '';

        if (this.likedSongs.length === 0) {
            container.innerHTML = '<p>You haven\'t liked any songs yet</p>';
            return;
        }

        this.playlist.forEach(song => {
            if (this.likedSongs.includes(song.url)) {
                const card = this.createSongCard(song, true);
                container.appendChild(card);
            }
        });
    }

    renderLibraryViews() {
        // Recently Added
        const recentContainer = document.querySelector('.recently-added-grid');
        recentContainer.innerHTML = '';
        const recentSongs = this.playlist.slice(0, 4);

        recentSongs.forEach(song => {
            const isLiked = this.likedSongs.includes(song.url);
            const card = this.createSongCard(song, isLiked);
            recentContainer.appendChild(card);
        });

        // Most Played
        const mostPlayedContainer = document.querySelector('.most-played-grid');
        mostPlayedContainer.innerHTML = '';
        const mostPlayed = [...this.playlist].sort((a, b) => b.plays - a.plays).slice(0, 4);

        mostPlayed.forEach(song => {
            const isLiked = this.likedSongs.includes(song.url);
            const card = this.createSongCard(song, isLiked);
            mostPlayedContainer.appendChild(card);
        });

        // By Genre
        const byGenreContainer = document.querySelector('.by-genre-grid');
        byGenreContainer.innerHTML = '';

        const genres = [...new Set(this.playlist.map(song => song.genre))];
        genres.slice(0, 4).forEach(genre => {
            const genreSongs = this.playlist.filter(song => song.genre === genre);
            if (genreSongs.length > 0) {
                const card = this.createSongCard(genreSongs[0], this.likedSongs.includes(genreSongs[0].url));
                card.querySelector('p').textContent = `${genre} • ${genreSongs.length} songs`;
                byGenreContainer.appendChild(card);
            }
        });

        // Top Artists
        const topArtistsContainer = document.querySelector('.top-artists-grid');
        topArtistsContainer.innerHTML = '';

        const artists = [...new Set(this.playlist.map(song => song.artist))];
        artists.slice(0, 6).forEach(artist => {
            const artistSongs = this.playlist.filter(song => song.artist === artist);
            if (artistSongs.length > 0) {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                            <div class="album-art" style="background-image: url('${artistSongs[0].artwork}')"></div>
                            <h3>${artist}</h3>
                            <p>${artistSongs.length} songs</p>
                        `;
                topArtistsContainer.appendChild(card);
            }
        });
    }

    renderStats() {
        // Update stats cards
        document.querySelectorAll('.stat-value')[0].textContent = this.userStats.songsPlayed.toLocaleString();
        document.querySelectorAll('.stat-value')[1].textContent = Math.floor(this.userStats.listeningTime / 60);
        document.querySelectorAll('.stat-value')[2].textContent = this.userStats.artistsDiscovered;
        document.querySelectorAll('.stat-value')[3].textContent = this.userStats.genresExplored;
    }

    renderAchievements() {
        const container = document.querySelector('.achievement-grid');
        if (!container) return;

        container.innerHTML = '';

        this.achievements.forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = 'achievement-card';
            achievementEl.innerHTML = `
                        <div class="achievement-icon"><i class="fas fa-trophy"></i></div>
                        <div class="achievement-info">
                            <div class="achievement-title">${achievement.name}</div>
                            <div class="achievement-desc">${achievement.description}</div>
                            <div class="achievement-progress">
                                <div class="achievement-progress-bar" style="width: ${achievement.progress}%"></div>
                            </div>
                        </div>
                    `;
            container.appendChild(achievementEl);
        });
    }

    createSongCard(song, isLiked = false) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.trackUrl = song.url;
        card.innerHTML = `
                    <div class="album-art" style="background-image: url('${song.artwork}')">
                        <div class="play-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <button class="like-btn ${isLiked ? 'active' : ''}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.like-btn')) {
                this.playTrack(song.url);
            }
        });

        const likeBtn = card.querySelector('.like-btn');
        likeBtn.addEventListener('click', () => {
            this.toggleLike(song.url);
            likeBtn.classList.toggle('active');
        });

        return card;
    }

    switchSection(sectionId) {
        this.sections.forEach(id => {
            const sectionEl = document.getElementById(`${id}-section`);
            if (sectionEl) sectionEl.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId + '-section');
        if (targetSection) targetSection.classList.add('active');

        if (sectionId === 'browse') {
            this.displaySongsByGenre('Pop');
        } else if (sectionId === 'liked') {
            this.renderLikedSongs();
        } else if (sectionId === 'library') {
            this.renderLibraryViews();
        } else if (sectionId === 'stats') {
            this.renderStats();
            this.renderAchievements();
        } else if (sectionId === 'discover') {
            this.renderRecommendedTracks();
        }
    }

    displaySongsByGenre(genre) {
        const container = document.querySelector('.browse-songs-grid');
        if (!container) return;

        container.innerHTML = '';
        const songs = this.playlist.filter(song => song.genre === genre);

        if (songs.length === 0) {
            container.innerHTML = `<p>No ${genre} songs found</p>`;
            return;
        }

        songs.forEach(song => {
            const isLiked = this.likedSongs.includes(song.url);
            const card = this.createSongCard(song, isLiked);
            container.appendChild(card);
        });
    }

    renderRecommendedTracks() {
        const container = document.querySelector('.recommended-tracks');
        if (!container) return;

        container.innerHTML = '';

        // Get recommended tracks (for demo, just use first 6)
        const recommended = this.playlist.slice(0, 6);

        recommended.forEach(song => {
            const isLiked = this.likedSongs.includes(song.url);
            const card = this.createSongCard(song, isLiked);
            container.appendChild(card);
        });
    }

    handleSearch(query) {
        const filteredSongs = this.playlist.filter(song =>
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase()) ||
            song.genre.toLowerCase().includes(query.toLowerCase())
        );

        const resultsContainer = document.querySelector('.recently-played-grid');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = '';

        if (filteredSongs.length === 0) {
            resultsContainer.innerHTML = '<p>No results found</p>';
            return;
        }

        filteredSongs.forEach(song => {
            const isLiked = this.likedSongs.includes(song.url);
            const card = this.createSongCard(song, isLiked);
            resultsContainer.appendChild(card);
        });
    }

    toggleLike(songUrl) {
        const index = this.likedSongs.indexOf(songUrl);
        if (index === -1) {
            this.likedSongs.push(songUrl);
            this.showNotification('Added to liked songs');

            // Check for achievement
            if (this.likedSongs.length >= 50) {
                this.unlockAchievement(2);
            }
        } else {
            this.likedSongs.splice(index, 1);
            this.showNotification('Removed from liked songs');
        }

        // Save to localStorage
        localStorage.setItem('megaPlayerLikedSongs', JSON.stringify(this.likedSongs));
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.completed) {
            achievement.completed = true;
            achievement.progress = 100;
            this.showToast('Achievement Unlocked: ' + achievement.name, 'success');
            localStorage.setItem('megaPlayerAchievements', JSON.stringify(this.achievements));
            this.renderAchievements();
        }
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    playTrack(trackUrl) {
        const track = this.playlist.find(song => song.url === trackUrl);
        if (track) {
            this.currentTrackIndex = this.playlist.indexOf(track);
            this.loadTrack();
            this.play();

            // Add visual indication of playing track
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('playing');
                if (card.dataset.trackUrl === trackUrl) {
                    card.classList.add('playing');
                }
            });

            // Increment play count
            track.plays = (track.plays || 0) + 1;
            this.userStats.songsPlayed++;

            // Update listening time
            this.userStats.listeningTime += Math.floor(this.audio.duration || 0);

            // Check for new artists
            if (!this.userStats.artists.includes(track.artist)) {
                this.userStats.artistsDiscovered++;
            }

            // Check for new genres
            if (!this.userStats.genres.includes(track.genre)) {
                this.userStats.genresExplored++;
            }

            // Save stats
            localStorage.setItem('megaPlayerStats', JSON.stringify(this.userStats));
            this.renderStats();

            // Show lyrics if available and enabled
            if (this.lyricsEnabled && track.lyrics) {
                this.displayLyrics(track.lyrics);
            }
        }
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
        this.updatePlayButton();

        // Start visualizer if enabled
        if (this.visualizerEnabled) {
            this.startVisualizer();
        }

        // Show mini player
        document.querySelector('.mini-player').classList.add('active');
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();

        // Stop visualizer
        this.stopVisualizer();

        // Remove playing indicators
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('playing');
        });
    }

    updatePlayButton() {
        const btn = document.querySelector('.play-pause-btn');
        btn.innerHTML = this.isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';

        // Update mini player button
        const miniBtn = document.querySelector('.mini-player-controls .fa-play');
        if (miniBtn) {
            miniBtn.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }

    nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.loadTrack();
        this.play();
    }

    prevTrack() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack();
        this.play();
    }

    loadTrack() {
        const track = this.playlist[this.currentTrackIndex];
        this.audio.src = track.url;
        this.updateSongInfo(track);
    }

    setVolume(volume) {
        this.volume = volume;
        this.audio.volume = volume;
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        const shuffleBtn = document.querySelector('.shuffle-btn');

        if (this.isShuffled) {
            this.shufflePlaylist();
            shuffleBtn.style.color = 'var(--primary-color)';
        } else {
            this.playlist = [...this.originalPlaylist];
            shuffleBtn.style.color = 'var(--text-secondary)';
        }
    }

    shufflePlaylist() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.playlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.playlist[i], this.playlist[j]] = [this.playlist[j], this.playlist[i]];
        }
    }

    toggleRepeat() {
        this.isRepeated = !this.isRepeated;
        const repeatBtn = document.querySelector('.repeat-btn');
        repeatBtn.style.color = this.isRepeated ? 'var(--primary-color)' : 'var(--text-secondary)';
    }

    updateProgress() {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;

        // Update mini player progress
        document.querySelector('.mini-player-progress-bar').style.width = `${progress}%`;

        // Update current time display
        const currentTime = document.querySelector('.current-time');
        currentTime.textContent = this.formatTime(this.audio.currentTime);
    }

    updateDuration() {
        const totalTime = document.querySelector('.total-time');
        totalTime.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    seek(e) {
        const progressContainer = document.querySelector('.progress-container');
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = pos * this.audio.duration;
    }

    updateSongInfo(track) {
        const songInfo = document.querySelector('.song-details');
        const albumArt = document.getElementById('current-album-art');
        songInfo.querySelector('h3').textContent = track.title;
        songInfo.querySelector('p').textContent = track.artist;
        albumArt.style.backgroundImage = `url('${track.artwork}')`;

        // Update mini player
        document.querySelector('.mini-player-title').textContent = `${track.title} - ${track.artist}`;
    }

    handleTrackEnd() {
        if (this.isRepeated) {
            this.audio.currentTime = 0;
            this.play();
        } else {
            this.nextTrack();
        }
    }

    handlePlayEvent() {
        // Update UI when audio starts playing
        this.isPlaying = true;
        this.updatePlayButton();
    }

    handlePauseEvent() {
        // Update UI when audio pauses
        this.isPlaying = false;
        this.updatePlayButton();
    }

    setTheme(theme) {
        this.theme = theme;
        document.body.classList.remove('theme-dark', 'theme-light', 'theme-custom');

        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else if (theme === 'custom') {
            document.querySelectorAll('.custom-theme-options').forEach(el => el.classList.remove('hidden'));
            this.setCustomColors();
        } else {
            document.querySelectorAll('.custom-theme-options').forEach(el => el.classList.add('hidden'));
            document.body.classList.remove('light-theme');
        }

        this.saveSettings();
    }

    setFontSize(size) {
        this.fontSize = size;
        document.body.style.fontSize = `${size}px`;
        document.getElementById('font-size-value').textContent = `${size}px`;
        this.saveSettings();
    }

    toggleNotifications(enabled) {
        this.notificationsEnabled = enabled;
        this.saveSettings();
    }

    setCustomColors() {
        const primaryColor = document.getElementById('primary-color-input').value;
        const secondaryColor = document.getElementById('secondary-color-input').value;

        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        this.saveSettings();
    }

    uploadSong() {
        const title = document.getElementById('song-title').value;
        const artist = document.getElementById('song-artist').value;
        const genre = document.getElementById('song-genre').value;
        const duration = document.getElementById('song-duration').value;
        const artwork = document.getElementById('song-artwork').value;
        const fileInput = document.getElementById('song-file');
        const lyrics = document.getElementById('song-lyrics').value;

        if (!title || !artist || !duration) {
            this.showNotification('Please fill in all required fields');
            return;
        }

        // In a real application, you would upload the file to a server
        // For this demo, we'll just add it to the playlist
        const newSong = {
            title,
            artist,
            genre,
            duration,
            artwork: artwork || 'https://via.placeholder.com/300',
            url: URL.createObjectURL(fileInput.files[0]),
            plays: 0,
            lyrics: lyrics || ''
        };

        this.playlist.unshift(newSong);
        this.originalPlaylist.unshift(newSong);

        // Clear form
        document.getElementById('song-title').value = '';
        document.getElementById('song-artist').value = '';
        document.getElementById('song-duration').value = '';
        document.getElementById('song-artwork').value = '';
        document.getElementById('song-file').value = '';
        document.getElementById('song-lyrics').value = '';

        this.showNotification('Song uploaded successfully!');
        this.renderUI();
    }

    showNotification(message) {
        if (!this.notificationsEnabled) return;

        const notification = document.querySelector('.notification');
        notification.querySelector('span').textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    showToast(message, type = 'success') {
        if (!this.notificationsEnabled) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'}"></i>
                    <span>${message}</span>
                `;

        document.querySelector('.toast-container').appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    saveSettings() {
        localStorage.setItem('megaPlayerSettings', JSON.stringify({
            theme: this.theme,
            fontSize: this.fontSize,
            notificationsEnabled: this.notificationsEnabled,
            visualizerEnabled: this.visualizerEnabled,
            lyricsEnabled: this.lyricsEnabled
        }));
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('megaPlayerSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.setTheme(settings.theme);
            this.setFontSize(settings.fontSize);
            this.toggleNotifications(settings.notificationsEnabled);
            this.visualizerEnabled = settings.visualizerEnabled || false;
            this.lyricsEnabled = settings.lyricsEnabled !== undefined ? settings.lyricsEnabled : true;

            // Set UI elements to match saved settings
            document.getElementById('theme-select').value = settings.theme;
            document.getElementById('font-size-slider').value = settings.fontSize;
            document.getElementById('notification-toggle').checked = settings.notificationsEnabled;
            document.getElementById('visualizer-toggle').checked = this.visualizerEnabled;
            document.getElementById('lyrics-toggle').checked = this.lyricsEnabled;

            if (settings.theme === 'custom') {
                this.setCustomColors();
            }
        }
    }

    updateVolumeUI() {
        document.querySelector('.volume-slider').value = this.audio.volume;
    }

    setSleepTimer(minutes) {
        // Clear existing timer
        if (this.sleepTimer) {
            clearTimeout(this.sleepTimer);
        }

        // Set new timer
        this.sleepTimer = setTimeout(() => {
            this.pause();
            this.showToast('Sleep timer: Playback stopped', 'info');
        }, minutes * 60 * 1000);
    }

    setupVisualizer() {
        // Create audio context for visualizer
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.source = this.audioContext.createMediaElementSource(this.audio);

        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        // Get visualizer bars
        this.visualizerBars = document.querySelectorAll('.visualizer-bar');
    }

    startVisualizer() {
        if (!this.visualizerEnabled) return;

        this.visualize();
    }

    stopVisualizer() {
        cancelAnimationFrame(this.visualizerAnimation);

        // Reset visualizer bars
        this.visualizerBars.forEach(bar => {
            bar.style.height = '10%';
        });
    }

    visualize() {
        this.analyser.getByteFrequencyData(this.dataArray);

        const barCount = this.visualizerBars.length;
        const step = Math.floor(this.bufferLength / barCount);

        for (let i = 0; i < barCount; i++) {
            const value = this.dataArray[i * step] / 255;
            const height = value * 100;
            this.visualizerBars[i].style.height = `${height}%`;
        }

        this.visualizerAnimation = requestAnimationFrame(() => this.visualize());
    }

    toggleVisualizer() {
        this.visualizerEnabled = !this.visualizerEnabled;

        if (this.visualizerEnabled && this.isPlaying) {
            this.startVisualizer();
        } else {
            this.stopVisualizer();
        }

        this.saveSettings();
        this.showNotification('Visualizer ' + (this.visualizerEnabled ? 'enabled' : 'disabled'));
    }

    toggleLyrics() {
        this.lyricsEnabled = !this.lyricsEnabled;

        const lyricsContainer = document.querySelector('.lyrics-container');
        if (lyricsContainer) {
            if (this.lyricsEnabled) {
                lyricsContainer.style.display = 'block';
            } else {
                lyricsContainer.style.display = 'none';
            }
        }

        this.saveSettings();
        this.showNotification('Lyrics ' + (this.lyricsEnabled ? 'enabled' : 'disabled'));
    }

    displayLyrics(lyrics) {
        const lyricsContainer = document.querySelector('.lyrics-container');
        if (!lyricsContainer) return;

        // Simple lyrics display - in a real app you'd parse and time the lyrics
        const lines = lyrics.split('\n');
        lyricsContainer.innerHTML = '';

        lines.forEach(line => {
            const lineEl = document.createElement('div');
            lineEl.className = 'lyrics-line';
            lineEl.textContent = line;
            lyricsContainer.appendChild(lineEl);
        });

        lyricsContainer.style.display = 'block';
    }

    showAddToPlaylistDialog() {
        // In a real app, this would show a modal with user's playlists
        this.showToast('Added to "Favorites" playlist', 'success');
    }

    applyAudioPreset(presetName) {
        // In a real app, this would apply actual EQ settings
        // For demo purposes, we'll just show a notification
        const presets = {
            flat: { low: 0, mid: 0, high: 0 },
            bass: { low: 8, mid: 2, high: 0 },
            treble: { low: 0, mid: 2, high: 8 },
            vocal: { low: 2, mid: 6, high: 4 },
            rock: { low: 6, mid: 4, high: 6 },
            jazz: { low: 4, mid: 6, high: 4 }
        };

        const preset = presets[presetName];
        if (preset) {
            document.getElementById('eq-low').value = preset.low;
            document.getElementById('eq-mid').value = preset.mid;
            document.getElementById('eq-high').value = preset.high;

            this.adjustEqualizer('low', preset.low);
            this.adjustEqualizer('mid', preset.mid);
            this.adjustEqualizer('high', preset.high);
        }
    }

    adjustEqualizer(band, value) {
        // In a real app, this would adjust the actual audio EQ
        // For demo, we'll just update the UI
        this.showNotification(`${band} frequencies adjusted to ${value}dB`);
    }

    exportData() {
        const data = {
            likedSongs: this.likedSongs,
            playlist: this.playlist,
            settings: {
                theme: this.theme,
                fontSize: this.fontSize,
                notificationsEnabled: this.notificationsEnabled
            },
            stats: this.userStats,
            achievements: this.achievements
        };

        const dataStr = JSON.stringify(data);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'megplayer-data.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();

        this.showToast('Data exported successfully', 'success');
    }

    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                if (data.likedSongs) this.likedSongs = data.likedSongs;
                if (data.playlist) this.playlist = data.playlist;
                if (data.settings) {
                    this.setTheme(data.settings.theme);
                    this.setFontSize(data.settings.fontSize);
                    this.toggleNotifications(data.settings.notificationsEnabled);
                }
                if (data.stats) this.userStats = data.stats;
                if (data.achievements) this.achievements = data.achievements;

                // Save to localStorage
                localStorage.setItem('megaPlayerLikedSongs', JSON.stringify(this.likedSongs));
                localStorage.setItem('megaPlayerSettings', JSON.stringify(data.settings));
                localStorage.setItem('megaPlayerStats', JSON.stringify(this.userStats));
                localStorage.setItem('megaPlayerAchievements', JSON.stringify(this.achievements));

                this.renderUI();
                this.showToast('Data imported successfully', 'success');
            } catch (err) {
                this.showToast('Error importing data', 'error');
            }
        };
        reader.readAsText(file);
    }

    clearData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            localStorage.clear();
            this.likedSongs = [];
            this.userStats = {
                songsPlayed: 0,
                listeningTime: 0,
                artistsDiscovered: 0,
                genresExplored: 0
            };
            this.achievements = [
                { id: 1, name: "First Listen", description: "Play your first song", progress: 0, completed: false },
                { id: 2, name: "Music Lover", description: "Like 50 songs", progress: 0, completed: false },
                { id: 3, name: "World Traveler", description: "Listen to music from 10 different countries", progress: 0, completed: false },
                { id: 4, name: "Marathon Listener", description: "Listen for 24 hours straight", progress: 0, completed: false }
            ];

            this.renderUI();
            this.showToast('All data cleared', 'info');
        }
    }

    activateEasterEgg() {
        document.querySelector('.easter-egg').classList.add('active');

        // Play special sound
        const easterAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/23/audio_5c2c35f9a0.mp3?filename=magical-chime-6990.mp3');
        easterAudio.play();
    }
}

// Initialize player
const player = new MegaPlayer();