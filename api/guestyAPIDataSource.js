import { RESTDataSource } from '@apollo/datasource-rest'

class GuestyAPIDataSource extends RESTDataSource {
  baseURL = 'https://booking.guesty.com/api/'

  token = 'eyJraWQiOiI4UkNhdVMtNG9YNnRkd19fbnBHNURiY0N2OE5oM3BoR1RZaDUtc1pzQ0Q4IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnQ2Z2ZYbkQta0FZN1VuNThaS1BKRmFGYWZNcFNveENaSUtmZF9zRUV6OWsiLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE2NzAzMzU3NDEsImV4cCI6MTY3MDQyMjE0MSwiY2lkIjoiMG9hN2QzNGgwZVdmNERGT2k1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2E3ZDM0aDBlV2Y0REZPaTVkNyIsImFjY291bnRJZCI6IjYzMGYzZmZkNmMwODEwMDAzMmYxNGYxNCIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImlhbSI6InYzIiwiYXBwbGljYXRpb25JZCI6IjBvYTdkMzRoMGVXZjRERk9pNWQ3In0.A2sL7MKGfdjl_C04ChxtrcoauBsPXdcHswuYY2qbrRjeJSDPIWGuhbRRCx_xODPt6VCx3J_fr7g2UQI9nxTptWiypMKAoLTe_wwSMnr09GiQiHFI6SSOS15N5xpiez4F8buxDGtqnx76YLFN_pnxl6cGuXMg_8dVBeHH-hMDn6ULuOTf1ripYJkStrfUfKux4xBz9lcVZi1rbrAtTe_1y3EUi5CNU39JVFC0qqli88Pi6iepxZhs_3usTOwqp1nvQm_kS0aixGy1D1ShOIAgVuDlKAdjnGBLyphXa6DLVFoxug8HdbUTnZ0ygURoUiAXa6fzMzzGVvq_X6XMSIanpg'

  async getApartments(litmit= 100) {
    const result = await this.get(`listings?limit=${litmit}`, {
      headers: {
        authorization: `Bearer ${this.token}`,
        contentType: 'application/json',
        accept: 'application/json',
      },
    })
    console.log(result)
    return result.results
  }

  async getCities(limit = 100) {
    const result = await this.get(`listings/cities?limit=${limit}`, {
      headers: {
        authorization: `Bearer ${this.token}`,
        contentType: 'application/json',
        accept: 'application/json',
      },
    })
    return result.results
  }

}

export default GuestyAPIDataSource