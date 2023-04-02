import { getSearchData } from '@/lib/search'

const handler = async (req, res) => {
	res.status(200).json(await getSearchData(req.query.q, req.query.where));
}

export default handler;