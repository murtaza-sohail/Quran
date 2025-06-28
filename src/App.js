// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";

// // const App = () => {
// //   const [arabic, setArabic] = useState([]);
// //   const [english, setEnglish] = useState([]);
// //   const [audio, setAudio] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [activeAyah, setActiveAyah] = useState(null);
// //   const [selectedSurah, setSelectedSurah] = useState("all");
// //   const [bookmarkedAyah, setBookmarkedAyah] = useState(null);
// //   const audioRef = useRef(null);

// //   // Fetch Quran
// //   useEffect(() => {
// //     const fetchQuran = async () => {
// //       try {
// //         const [arRes, enRes, auRes] = await Promise.all([
// //           axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani"),
// //           axios.get("http://api.alquran.cloud/v1/quran/en.asad"),
// //           axios.get("http://api.alquran.cloud/v1/quran/ar.alafasy"),
// //         ]);
// //         setArabic(arRes.data.data.surahs);
// //         setEnglish(enRes.data.data.surahs);
// //         setAudio(auRes.data.data.surahs);

// //         const saved = localStorage.getItem("lastAyah");
// //         if (saved) {
// //           const [ayahId, surahNumber] = saved.split("-");
// //           setActiveAyah(Number(ayahId));
// //           setTimeout(() => {
// //             const el = document.getElementById(`ayah-${ayahId}`);
// //             if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
// //           }, 1000);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching Quran:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchQuran();
// //   }, []);

// //   // Play and auto-scroll next
// //   const handleAyahClick = (ayah, audioUrl, nextAyah) => {
// //     setActiveAyah(ayah.number);
// //     localStorage.setItem("lastAyah", `${ayah.number}-${ayah.surah?.number || ayah.surahNumber}`);
// //     if (audioRef.current) {
// //       audioRef.current.src = audioUrl;
// //       audioRef.current.play().catch(console.warn);
// //     }
// //     scrollToAyah(ayah.number);

// //     // Auto play next on end
// //     if (audioRef.current) {
// //       audioRef.current.onended = () => {
// //         if (nextAyah) handleAyahClick(nextAyah, nextAyah.audioUrl);
// //       };
// //     }
// //   };

// //   const scrollToAyah = (ayahNumber) => {
// //     const el = document.getElementById(`ayah-${ayahNumber}`);
// //     if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
// //   };

// //   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

// //   const filteredSurahs = selectedSurah === "all"
// //     ? arabic
// //     : arabic.filter((s) => s.number === Number(selectedSurah));

// //   if (loading) return <div className="loading">📖 Loading Quran...</div>;

// //   return (
// //     <div className="app">
// //       <style>
// //         {`
// //         body {
// //           margin: 0;
// //           font-family: 'Segoe UI', sans-serif;
// //           background-color: #121212;
// //           color: #f5f5f5;
// //         }

// //         .app {
// //           max-width: 1000px;
// //           margin: auto;
// //           padding: 20px;
// //         }

// //         .heading {
// //           text-align: center;
// //           color: #00e676;
// //           font-size: 2rem;
// //           margin-bottom: 20px;
// //         }

// //         .dropdown {
// //           margin-bottom: 20px;
// //           display: flex;
// //           justify-content: center;
// //         }

// //         .dropdown select {
// //           padding: 10px;
// //           font-size: 16px;
// //           border-radius: 8px;
// //           background: #1e1e1e;
// //           color: #fff;
// //           border: 1px solid #00e676;
// //         }

// //         .audio-player {
// //           width: 100%;
// //           margin: 10px 0 30px;
// //         }

// //         .surah {
// //           margin-bottom: 50px;
// //         }

// //         .surah-title {
// //           font-size: 1.5rem;
// //           color: #80cbc4;
// //           border-left: 5px solid #00e676;
// //           padding-left: 10px;
// //           margin-bottom: 15px;
// //         }

// //         .ayah {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: flex-start;
// //           background: #1e1e1e;
// //           border-radius: 10px;
// //           padding: 15px;
// //           margin-bottom: 10px;
// //           cursor: pointer;
// //           border: 1px solid transparent;
// //           transition: 0.3s ease;
// //         }

// //         .ayah:hover {
// //           border: 1px solid #00e676;
// //           background: #2a2a2a;
// //         }

// //         .ayah.active {
// //           border: 2px solid #00e676;
// //           background: #003300;
// //           box-shadow: 0 0 10px #00e67666;
// //         }

// //         .left-side {
// //           flex: 1;
// //           text-align: left;
// //         }

// //         .right-side {
// //           flex: 1;
// //           text-align: right;
// //           direction: rtl;
// //           font-size: 22px;
// //           color: #ffffff;
// //         }

// //         .reference {
// //           color: #00e676;
// //           font-weight: bold;
// //           margin-bottom: 5px;
// //         }

// //         .english {
// //           color: #ccc;
// //           font-size: 15px;
// //         }

// //         .loading {
// //           color: #00e676;
// //           text-align: center;
// //           margin-top: 40px;
// //           font-size: 20px;
// //         }

// //         .scroll-btn {
// //           position: fixed;
// //           bottom: 30px;
// //           right: 30px;
// //           background: #00e676;
// //           color: #000;
// //           border: none;
// //           padding: 10px 18px;
// //           font-size: 16px;
// //           border-radius: 50px;
// //           cursor: pointer;
// //           box-shadow: 0 0 10px #00e67688;
// //         }

// //         .khatam-box {
// //           background-color: #1e1e1e;
// //           color: #00e676;
// //           text-align: center;
// //           padding: 30px;
// //           margin-top: 50px;
// //           border: 2px dashed #00e676;
// //           border-radius: 16px;
// //           font-size: 20px;
// //           box-shadow: 0 0 10px #00e67655;
// //         }

// //         .khatam-box h2 {
// //           margin-bottom: 10px;
// //         }
// //         `}
// //       </style>

  
// //       <h1 className="heading">📖 Holy Quran</h1>
// // <p style={{ textAlign: "center", fontSize: "1.2rem", marginBottom: "20px", color: "blue" }}>
// //   Read, Listen, and Reflect upon the Words of Allah
// // </p>

     

// //       <div className="dropdown">
// //         <select value={selectedSurah} onChange={(e) => setSelectedSurah(e.target.value)}>
// //           <option value="all">All Surahs</option>
// //           {arabic.map((s) => (
// //             <option key={s.number} value={s.number}>
// //               Surah {s.number}: {s.englishName}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       <audio ref={audioRef} controls className="audio-player" />

// //       {filteredSurahs.map((surah, i) => (
// //         <div key={surah.number} className="surah">
// //           <h2 className="surah-title">
// //             Surah {surah.number}: {surah.englishName} ({surah.name})
// //           </h2>

// //           {surah.ayahs.map((ayah, j) => {
// //             const engAyah = english[i]?.ayahs[j];
// //             const audioAyah = audio[i]?.ayahs[j];
// //             const nextAyah = surah.ayahs[j + 1]
// //               ? {
// //                   ...surah.ayahs[j + 1],
// //                   audioUrl: audio[i]?.ayahs[j + 1]?.audio,
// //                   surahNumber: surah.number,
// //                 }
// //               : null;

// //             return (
// //               <div
// //                 key={ayah.number}
// //                 id={`ayah-${ayah.number}`}
// //                 className={`ayah ${activeAyah === ayah.number ? "active" : ""}`}
// //                 onClick={() => handleAyahClick(ayah, audioAyah?.audio, nextAyah)}
// //               >
// //                 <div className="left-side">
// //                   <div className="reference">
// //                     Surah {surah.number}:{ayah.numberInSurah}
// //                   </div>
// //                   <div className="english">{engAyah?.text}</div>
// //                 </div>
// //                 <div className="right-side">{ayah.text}</div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       ))}

// //       <div className="khatam-box">
// //         <h2>📘  Quran Reading Completed!</h2>
// //         <p>May Allah accept your recitation. 🤲</p>
// //       </div>

// //       <button className="scroll-btn" onClick={scrollToTop}>⬆️ Top</button>
// //     </div>
// //   );
// // };

// // export default App;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// const App = () => {
//   const [arabic, setArabic] = useState([]);
//   const [english, setEnglish] = useState([]);
//   const [audio, setAudio] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeAyah, setActiveAyah] = useState(null);
//   const [selectedSurah, setSelectedSurah] = useState("all");
//   const [flattenedAyahs, setFlattenedAyahs] = useState([]);
//   const audioRef = useRef(null);

//   // Fetch Quran
//   useEffect(() => {
//     const fetchQuran = async () => {
//       try {
//         const [arRes, enRes, auRes] = await Promise.all([
//           axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani"),
//           axios.get("http://api.alquran.cloud/v1/quran/en.asad"),
//           axios.get("http://api.alquran.cloud/v1/quran/ar.alafasy"),
//         ]);
//         const arabicData = arRes.data.data.surahs;
//         const englishData = enRes.data.data.surahs;
//         const audioData = auRes.data.data.surahs;

//         setArabic(arabicData);
//         setEnglish(englishData);
//         setAudio(audioData);

//         // Flatten all ayahs with references
//         const flat = [];
//         for (let s = 0; s < arabicData.length; s++) {
//           const surah = arabicData[s];
//           for (let a = 0; a < surah.ayahs.length; a++) {
//             flat.push({
//               arabic: surah.ayahs[a],
//               english: englishData[s]?.ayahs[a],
//               audio: audioData[s]?.ayahs[a],
//               surahNumber: surah.number,
//               index: flat.length,
//             });
//           }
//         }
//         setFlattenedAyahs(flat);

//         const saved = localStorage.getItem("lastAyah");
//         if (saved) {
//           const [ayahId] = saved.split("-");
//           setActiveAyah(Number(ayahId));
//           setTimeout(() => {
//             const el = document.getElementById(`ayah-${ayahId}`);
//             if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
//           }, 1000);
//         }
//       } catch (err) {
//         console.error("Error fetching Quran:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuran();
//   }, []);

//   const handleAyahClick = (ayah, audioUrl) => {
//     setActiveAyah(ayah.number);
//     localStorage.setItem("lastAyah", `${ayah.number}-${ayah.surahNumber}`);

//     if (audioRef.current) {
//       audioRef.current.src = audioUrl;
//       audioRef.current.play().catch(console.warn);

//       audioRef.current.onended = () => {
//         const currentIndex = flattenedAyahs.findIndex((a) => a.arabic.number === ayah.number);
//         const next = flattenedAyahs[currentIndex + 1];
//         if (next) {
//           handleAyahClick(next.arabic, next.audio.audio);
//         }
//       };
//     }

//     scrollToAyah(ayah.number);
//   };

//   const scrollToAyah = (ayahNumber) => {
//     const el = document.getElementById(`ayah-${ayahNumber}`);
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
//   };

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   const filteredSurahs = selectedSurah === "all"
//     ? arabic
//     : arabic.filter((s) => s.number === Number(selectedSurah));

//   if (loading) return <div className="loading">📖 Loading Quran...</div>;

//   return (
//     <div className="app">
//       <style>
//         {`
//         body {
//           margin: 0;
//           font-family: 'Segoe UI', sans-serif;
//           background-color: #121212;
//           color: #f5f5f5;
//         }

//         .app {
//           max-width: 1000px;
//           margin: auto;
//           padding: 20px;
//         }

//         .heading {
//           text-align: center;
//           color: #00e676;
//           font-size: 2rem;
//           margin-bottom: 10px;
//         }

//         .subheading {
//           text-align: center;
//           font-size: 1.2rem;
//           margin-bottom: 20px;
//           color: blue;
//         }

//         .dropdown {
//           margin-bottom: 20px;
//           display: flex;
//           justify-content: center;
//         }

//         .dropdown select {
//           padding: 10px;
//           font-size: 16px;
//           border-radius: 8px;
//           background: #1e1e1e;
//           color: #fff;
//           border: 1px solid #00e676;
//         }

//         .audio-player {
//           width: 100%;
//           margin: 10px 0 30px;
//         }

//         .surah {
//           margin-bottom: 50px;
//         }

//         .surah-title {
//           font-size: 1.5rem;
//           color: #80cbc4;
//           border-left: 5px solid #00e676;
//           padding-left: 10px;
//           margin-bottom: 15px;
//         }

//         .ayah {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           background: #1e1e1e;
//           border-radius: 10px;
//           padding: 15px;
//           margin-bottom: 10px;
//           cursor: pointer;
//           border: 1px solid transparent;
//           transition: 0.3s ease;
//         }

//         .ayah:hover {
//           border: 1px solid #00e676;
//           background: #2a2a2a;
//         }

//         .ayah.active {
//           border: 2px solid #00e676;
//           background: #003300;
//           box-shadow: 0 0 10px #00e67666;
//         }

//         .left-side {
//           flex: 1;
//           text-align: left;
//         }

//         .right-side {
//           flex: 1;
//           text-align: right;
//           direction: rtl;
//           font-size: 22px;
//           color: #ffffff;
//         }

//         .reference {
//           color: #00e676;
//           font-weight: bold;
//           margin-bottom: 5px;
//         }

//         .english {
//           color: #ccc;
//           font-size: 15px;
//         }

//         .loading {
//           color: #00e676;
//           text-align: center;
//           margin-top: 40px;
//           font-size: 20px;
//         }

//         .scroll-btn {
//           position: fixed;
//           bottom: 30px;
//           right: 30px;
//           background: #00e676;
//           color: #000;
//           border: none;
//           padding: 10px 18px;
//           font-size: 16px;
//           border-radius: 50px;
//           cursor: pointer;
//           box-shadow: 0 0 10px #00e67688;
//         }

//         .khatam-box {
//           background-color: #1e1e1e;
//           color: #00e676;
//           text-align: center;
//           padding: 30px;
//           margin-top: 50px;
//           border: 2px dashed #00e676;
//           border-radius: 16px;
//           font-size: 20px;
//           box-shadow: 0 0 10px #00e67655;
//         }

//         .khatam-box h2 {
//           margin-bottom: 10px;
//         }
//         `}
//       </style>

//       <h1 className="heading">📖 Holy Quran</h1>
//       <p className="subheading">Read, Listen, and Reflect upon the Words of Allah</p>

//       <div className="dropdown">
//         <select value={selectedSurah} onChange={(e) => setSelectedSurah(e.target.value)}>
//           <option value="all">All Surahs</option>
//           {arabic.map((s) => (
//             <option key={s.number} value={s.number}>
//               Surah {s.number}: {s.englishName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <audio ref={audioRef} controls className="audio-player" />

//       {filteredSurahs.map((surah, i) => (
//         <div key={surah.number} className="surah">
//           <h2 className="surah-title">
//             Surah {surah.number}: {surah.englishName} ({surah.name})
//           </h2>

//           {surah.ayahs.map((ayah, j) => {
//             const engAyah = english[i]?.ayahs[j];
//             const audioAyah = audio[i]?.ayahs[j];
//             return (
//               <div
//                 key={ayah.number}
//                 id={`ayah-${ayah.number}`}
//                 className={`ayah ${activeAyah === ayah.number ? "active" : ""}`}
//                 onClick={() =>
//                   handleAyahClick(
//                     { ...ayah, surahNumber: surah.number },
//                     audioAyah?.audio
//                   )
//                 }
//               >
//                 <div className="left-side">
//                   <div className="reference">
//                     Surah {surah.number}:{ayah.numberInSurah}
//                   </div>
//                   <div className="english">{engAyah?.text}</div>
//                 </div>
//                 <div className="right-side">{ayah.text}</div>
//               </div>
//             );
//           })}
//         </div>
//       ))}

//       <div className="khatam-box">
//         <h2>📘 Quran Reading Completed!</h2>
//         <p>May Allah accept your recitation. 🤲</p>
//       </div>

//       <button className="scroll-btn" onClick={scrollToTop}>⬆️ Top</button>
//     </div>
//   );
// };

// export default App;

// CODE 2 START  //

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// const App = () => {
//   const [arabic, setArabic] = useState([]);
//   const [english, setEnglish] = useState([]);
//   const [audio, setAudio] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeAyah, setActiveAyah] = useState(null);
//   const [selectedSurah, setSelectedSurah] = useState("all");
//   const [flattenedAyahs, setFlattenedAyahs] = useState([]);
//   const [isPlayingAll, setIsPlayingAll] = useState(false);
//   const audioRef = useRef(null);

//   // Fetch Quran
//   useEffect(() => {
//     const fetchQuran = async () => {
//       try {
//         const [arRes, enRes, auRes] = await Promise.all([
//           axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani"),
//           axios.get("http://api.alquran.cloud/v1/quran/en.asad"),
//           axios.get("http://api.alquran.cloud/v1/quran/ar.alafasy"),
//         ]);

//         const arData = arRes.data.data.surahs;
//         const enData = enRes.data.data.surahs;
//         const auData = auRes.data.data.surahs;

//         setArabic(arData);
//         setEnglish(enData);
//         setAudio(auData);

//         // Flatten for global play
//         const flat = [];
//         for (let s = 0; s < arData.length; s++) {
//           const surah = arData[s];
//           for (let a = 0; a < surah.ayahs.length; a++) {
//             flat.push({
//               arabic: surah.ayahs[a],
//               english: enData[s]?.ayahs[a],
//               audio: auData[s]?.ayahs[a],
//               surahNumber: surah.number,
//               index: flat.length,
//             });
//           }
//         }
//         setFlattenedAyahs(flat);

//         const saved = localStorage.getItem("lastAyah");
//         if (saved) {
//           const [ayahId] = saved.split("-");
//           setActiveAyah(Number(ayahId));
//           setTimeout(() => {
//             const el = document.getElementById(`ayah-${ayahId}`);
//             if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
//           }, 1000);
//         }
//       } catch (err) {
//         console.error("Error fetching Quran:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuran();
//   }, []);

//   const scrollToAyah = (ayahNumber) => {
//     const el = document.getElementById(`ayah-${ayahNumber}`);
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
//   };

//   const handleAyahClick = (ayah, audioUrl) => {
//     setActiveAyah(ayah.number);
//     localStorage.setItem("lastAyah", `${ayah.number}-${ayah.surahNumber}`);

//     if (audioRef.current) {
//       audioRef.current.src = audioUrl;
//       audioRef.current.play().catch(console.warn);

//       audioRef.current.onended = () => {
//         const currentIndex = flattenedAyahs.findIndex((a) => a.arabic.number === ayah.number);
//         const next = flattenedAyahs[currentIndex + 1];
//         if (next && isPlayingAll) {
//           handleAyahClick(next.arabic, next.audio.audio);
//         } else {
//           setIsPlayingAll(false);
//         }
//       };
//     }

//     scrollToAyah(ayah.number);
//   };

//   const startPlayAll = () => {
//     setIsPlayingAll(true);
//     if (flattenedAyahs.length > 0) {
//       const first = flattenedAyahs[0];
//       handleAyahClick(first.arabic, first.audio.audio);
//     }
//   };

//   const stopPlayAll = () => {
//     setIsPlayingAll(false);
//     if (audioRef.current) {
//       audioRef.current.pause();
//     }
//   };

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   const filteredSurahs = selectedSurah === "all"
//     ? arabic
//     : arabic.filter((s) => s.number === Number(selectedSurah));

//   if (loading) return <div className="loading">📖 Loading Quran...</div>;

//   return (
//     <div className="app">
//       <style>{`
//         body {
//           margin: 0;
//           font-family: 'Segoe UI', sans-serif;
//           background-color: #121212;
//           color: #f5f5f5;
//         }
//         .app {
//           max-width: 1000px;
//           margin: auto;
//           padding: 20px;
//         }
//         .heading {
//           text-align: center;
//           color: #00e676;
//           font-size: 2rem;
//           margin-bottom: 10px;
//         }
//         .subheading {
//           text-align: center;
//           font-size: 1.2rem;
//           margin-bottom: 20px;
//           color: blue;
//         }
//         .dropdown {
//           margin-bottom: 20px;
//           display: flex;
//           justify-content: center;
//         }
//         .dropdown select {
//           padding: 10px;
//           font-size: 16px;
//           border-radius: 8px;
//           background: #1e1e1e;
//           color: #fff;
//           border: 1px solid #00e676;
//         }
//         .audio-player {
//           width: 100%;
//           margin: 10px 0 20px;
//         }
//         .surah {
//           margin-bottom: 50px;
//         }
//         .surah-title {
//           font-size: 1.5rem;
//           color: #80cbc4;
//           border-left: 5px solid #00e676;
//           padding-left: 10px;
//           margin-bottom: 15px;
//         }
//         .ayah {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           background: #1e1e1e;
//           border-radius: 10px;
//           padding: 15px;
//           margin-bottom: 10px;
//           cursor: pointer;
//           border: 1px solid transparent;
//           transition: 0.3s ease;
//         }
//         .ayah:hover {
//           border: 1px solid #00e676;
//           background: #2a2a2a;
//         }
//         .ayah.active {
//           border: 2px solid #00e676;
//           background: #003300;
//           box-shadow: 0 0 10px #00e67666;
//         }
//         .left-side {
//           flex: 1;
//           text-align: left;
//         }
//         .right-side {
//           flex: 1;
//           text-align: right;
//           direction: rtl;
//           font-size: 22px;
//           color: #ffffff;
//         }
//         .reference {
//           color: #00e676;
//           font-weight: bold;
//           margin-bottom: 5px;
//         }
//         .english {
//           color: #ccc;
//           font-size: 15px;
//         }
//         .loading {
//           color: #00e676;
//           text-align: center;
//           margin-top: 40px;
//           font-size: 20px;
//         }
//         .scroll-btn {
//           position: fixed;
//           bottom: 30px;
//           right: 30px;
//           background: #00e676;
//           color: #000;
//           border: none;
//           padding: 10px 18px;
//           font-size: 16px;
//           border-radius: 50px;
//           cursor: pointer;
//           box-shadow: 0 0 10px #00e67688;
//         }
//         .khatam-box {
//           background-color: #1e1e1e;
//           color: #00e676;
//           text-align: center;
//           padding: 30px;
//           margin-top: 50px;
//           border: 2px dashed #00e676;
//           border-radius: 16px;
//           font-size: 20px;
//           box-shadow: 0 0 10px #00e67655;
//         }
//         .khatam-box h2 {
//           margin-bottom: 10px;
//         }
//         .playall-controls {
//           display: flex;
//           justify-content: center;
//           gap: 10px;
//           margin-bottom: 20px;
//         }
//         .playall-controls button {
//           background-color: #00e676;
//           border: none;
//           padding: 10px 20px;
//           font-size: 16px;
//           border-radius: 10px;
//           cursor: pointer;
//           color: #000;
//         }
//       `}</style>

//       <h1 className="heading">📖 Holy Quran</h1>
//       <p className="subheading">Read, Listen, and Reflect upon the Words of Allah</p>

//       <div className="dropdown">
//         <select value={selectedSurah} onChange={(e) => setSelectedSurah(e.target.value)}>
//           <option value="all">All Surahs</option>
//           {arabic.map((s) => (
//             <option key={s.number} value={s.number}>
//               Surah {s.number}: {s.englishName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="playall-controls">
//         {!isPlayingAll ? (
//           <button onClick={startPlayAll}>▶️ Play All</button>
//         ) : (
//           <button onClick={stopPlayAll}>⏹ Stop</button>
//         )}
//       </div>

//       <audio ref={audioRef} controls className="audio-player" />

//       {filteredSurahs.map((surah, i) => (
//         <div key={surah.number} className="surah">
//           <h2 className="surah-title">
//             Surah {surah.number}: {surah.englishName} ({surah.name})
//           </h2>

//           {surah.ayahs.map((ayah, j) => {
//             const engAyah = english[i]?.ayahs[j];
//             const audioAyah = audio[i]?.ayahs[j];
//             return (
//               <div
//                 key={ayah.number}
//                 id={`ayah-${ayah.number}`}
//                 className={`ayah ${activeAyah === ayah.number ? "active" : ""}`}
//                 onClick={() =>
//                   handleAyahClick(
//                     { ...ayah, surahNumber: surah.number },
//                     audioAyah?.audio
//                   )
//                 }
//               >
//                 <div className="left-side">
//                   <div className="reference">
//                     Surah {surah.number}:{ayah.numberInSurah}
//                   </div>
//                   <div className="english">{engAyah?.text}</div>
//                 </div>
//                 <div className="right-side">{ayah.text}</div>
//               </div>
//             );
//           })}
//         </div>
//       ))}

//       <div className="khatam-box">
//         <h2>📘 Quran Reading Completed!</h2>
//         <p>May Allah accept your recitation. 🤲</p>
//       </div>

//       <button className="scroll-btn" onClick={scrollToTop}>⬆️ Top</button>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const App = () => {
  const [arabic, setArabic] = useState([]);
  const [english, setEnglish] = useState([]);
  const [audio, setAudio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAyah, setActiveAyah] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState("all");
  const [flattenedAyahs, setFlattenedAyahs] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchQuran = async () => {
      try {
        const [arRes, enRes, auRes] = await Promise.all([
          axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani"),
          axios.get("http://api.alquran.cloud/v1/quran/en.asad"),
          axios.get("http://api.alquran.cloud/v1/quran/ar.alafasy"),
        ]);

        const ar = arRes.data.data.surahs;
        const en = enRes.data.data.surahs;
        const au = auRes.data.data.surahs;

        setArabic(ar);
        setEnglish(en);
        setAudio(au);

        const flat = ar.flatMap((surah, s) =>
          surah.ayahs.map((ayah, j) => ({
            arabic: ayah,
            english: en[s]?.ayahs[j],
            audio: au[s]?.ayahs[j],
            surahNumber: surah.number,
            globalIndex: null,
          }))
        ).map((item, idx) => ({ ...item, globalIndex: idx }));

        setFlattenedAyahs(flat);

        const saved = localStorage.getItem("lastAyah");
        if (saved) {
          const [idx] = saved.split("-");
          const ayahNumber = flat[parseInt(idx)]?.arabic.number;
          setActiveAyah(ayahNumber);
          setTimeout(() => {
            document.getElementById(`ayah-${ayahNumber}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 800);
        }
      } catch (err) {
        console.error("Error loading Quran:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuran();
  }, []);

  const handleAyahClick = (item) => {
    const ayah = item.arabic;
    setActiveAyah(ayah.number);
    localStorage.setItem("lastAyah", `${item.globalIndex}-${ayah.number}`);
    scrollToAyah(ayah.number);

    if (audioRef.current) {
      audioRef.current.src = item.audio.audio;
      audioRef.current.play().catch(console.warn);
      audioRef.current.onended = () => {
        const next = flattenedAyahs[item.globalIndex + 1];
        if (next) handleAyahClick(next);
        else {
          // alert("🎉 Reached end of Quran!");
          scrollToEndMessage();
        }
      };
    }
  };

  const scrollToAyah = (number) => {
    document.getElementById(`ayah-${number}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToEndMessage = () => {
    document.getElementById("khatam-box")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const filteredSurahs =
    selectedSurah === "all" ? arabic : arabic.filter((s) => s.number === Number(selectedSurah));

  if (loading) return <div className="loading">📖 Loading Quran...</div>;

  return (
    <div className="app">
      <style>{`
        body { margin: 0; font-family: Arial, sans-serif; background: #121212; color: #eee; }
        .app { max-width: 900px; margin: auto; padding: 20px; }
        h1.heading { text-align: center; color: #00e676; font-size: 2rem; margin: 10px 0; }
        p.subheading { text-align: center; color: #66ccff; font-size: 1.1rem; margin-bottom: 20px; }

        .khatam-box {
          background: #1e1e1e;
          border: 2px dashed #00e676;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          margin: 50px auto;
          box-shadow: 0 0 10px #00e67633;
        }
        .khatam-box h2 { color: #00e676; margin-bottom: 10px; }

        .controls {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        .controls select {
          padding: 10px;
          font-size: 16px;
          background: #1e1e1e;
          color: #fff;
          border: 1px solid #00e676;
          border-radius: 8px;
        }

        .ayah {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 15px;
          background: #1e1e1e;
          margin-bottom: 10px;
          border-radius: 10px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: 0.3s;
        }
        .ayah:hover { background: #2a2a2a; border: 1px solid #00e676; }
        .ayah.active { background: #003300; border: 2px solid #00e676; }

        .left-side { flex: 1; text-align: left; }
        .right-side { flex: 1; text-align: right; direction: rtl; font-size: 20px; }

        .reference { font-weight: bold; color: #00e676; }
        .english { font-size: 14px; color: #ccc; }

        .scroll-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #00e676;
          color: #000;
          border: none;
          padding: 12px 16px;
          font-size: 16px;
          border-radius: 50px;
          cursor: pointer;
        }

        audio { width: 100%; margin-top: 20px; }

        @media (max-width: 600px) {
          .right-side { font-size: 18px; }
          .english { font-size: 12px; }
        }

        .loading { text-align: center; margin-top: 50px; color: #00e676; font-size: 20px; }
      `}</style>

      <h1 className="heading">📖 Holy Quran</h1>
      <p className="subheading">Read, Listen, and Reflect upon the Words of Allah</p>

      <div className="controls">
        <select value={selectedSurah} onChange={(e) => setSelectedSurah(e.target.value)}>
          <option value="all">All Surahs</option>
          {arabic.map((s) => (
            <option key={s.number} value={s.number}>
              {s.number}. {s.englishName}
            </option>
          ))}
        </select>
      </div>

      <audio ref={audioRef} controls />

      {filteredSurahs.map((surah, i) => (
        <div key={surah.number}>
          <h2 style={{ color: "#80cbc4", marginTop: "30px" }}>
            Surah {surah.number}: {surah.englishName} ({surah.name})
          </h2>
          {surah.ayahs.map((ayah, j) => {
            const engAyah = english[i]?.ayahs[j];
            const item = flattenedAyahs.find(f => f.arabic.number === ayah.number);
            return (
              <div
                key={ayah.number}
                id={`ayah-${ayah.number}`}
                className={`ayah ${activeAyah === ayah.number ? "active" : ""}`}
                onClick={() => handleAyahClick(item)}
              >
                <div className="left-side">
                  <div className="reference">Surah {surah.number}:{ayah.numberInSurah}</div>
                  <div className="english">{engAyah?.text}</div>
                </div>
                <div className="right-side">{ayah.text}</div>
              </div>
            );
          })}
        </div>
      ))}

      {/* ✅ Always shown, even if Surah 114 is hidden */}
      <div id="khatam-box" className="khatam-box">
        <h2>📘 Quran Reading Completed!</h2>
        <p>May Allah accept your recitation. 🤲</p>
      </div>

      <button className="scroll-btn" onClick={scrollToTop}>⬆️</button>
    </div>
  );
};

export default App;






























// This code is a React application that fetches the Quran in Arabic, English translation, and audio recitation.
// It allows users to read, listen, and navigate through the Quran, with features like playing all ayahs in sequence.
// The app also supports bookmarking the last recited ayah and provides a smooth user experience with auto-scrolling and audio playback.
// The styling is done using inline CSS for a modern dark theme with vibrant colors.
// Note: Make sure to run this code in an environment that supports React and has access to the Quran API.







