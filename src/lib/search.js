const axios = require('axios');

const getYoutubeData = (response) => {
	const list = response.data.split(`,"title":`);
	const result = [];
	for(let e of list) {
		if(!(
			e.includes(`{"videoId":`) && 
			e.includes(`"accessibility":{"accessibilityData":{"label":"`) && 
			e.includes(`"lengthText":{"accessibility":{"accessibilityData":`)
		)) 
		continue;
		let name = e.split(`{"runs":[{"text":"`)[1].split(`"}],"accessibility":{"accessibilityData":{"label":"`)[0];
		if(name.includes(`[TJ노래방] `)) name = name.split(`[TJ노래방] `)[1];
		if(name.includes(`[KY 금영노래방] `)) name = name.split(`[KY 금영노래방] `)[1];
		if(name.includes(`[KY ENTERTAINMENT] `)) name = name.split(`[KY ENTERTAINMENT] `)[1];
		if(name.includes(` / TJ Karaoke`)) name = name.split(` / TJ Karaoke`)[0];
		if(name.includes(` / KY Karaoke`)) name = name.split(` / KY Karaoke`)[0];
		
		const title = name.split(` - `)[0];
		let artist = name.split(` - `)[1];
		if(artist.includes(`(`)) artist = artist.split(`(`)[0];

		const videoId = e.split(`"videoId":"`)[1].split(`"`)[0];

		if(!title || !artist || !videoId) continue;

		result.push({title, artist, videoId});
	}
	return result;
}

export const getTjTop20 = async () => {
	const response = await axios.get('https://www.youtube.com/playlist', {
		params: {
			'list': 'PL5rkMpxC5Ex-Pcr8KxI-CsPDbDMttQ8ZW'
		}
	});
	return getYoutubeData(response);
}

export const getSearchData = async (search, where = 'tj') => {
	const what = {
		'tj': 'TJKaraoke',
		'ky': 'KARAOKEKY'
	}
	const response = await axios.get(`https://www.youtube.com/@${what[where]}/search`, {
		params: {
			'query': search
		}
	});
	return getYoutubeData(response);
}