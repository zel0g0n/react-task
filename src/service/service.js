import { useHttp } from "./own-hook";

const service = () => {
  const {request} = useHttp()
  const getData = async (URL) => {
    const response = await request(URL)
    return response
  }

  return {getData}
}
export {service}