import { getTjTop20 } from '@/lib/search'

const handler = async (req, res) => {
  res.status(200).json(await getTjTop20());
}

export default handler;