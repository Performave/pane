import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class NetworkController {
  public async index(ctx: HttpContextContract) {
    let IP_V4 = process.env.IP_V4 || "No IPV4 Set";
    let IP_V6 = process.env.IP_V6 || "No IPV6 Set";
    let LOCATION = process.env.LOCATION || "No Location Set";
    return { ip_v4: IP_V4, ip_v6: IP_V6, client_ip: ctx.request.ip(), location: LOCATION };
  }
}
