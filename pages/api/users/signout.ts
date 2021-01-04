import { NextApiRequest, NextApiResponse } from "next";
import { authenticated } from '../authenticated'


export default authenticated (async function signOut (req:NextApiRequest, res:NextApiResponse) {
  try {
    res.destroy()
  } catch(e) {
    console.log(e.message)
  }
})