import { RESTDataSource } from '@apollo/datasource-rest'

class GuestyAPIDataSource extends RESTDataSource {
  baseURL = 'https://booking.guesty.com/api/'

  token = 'eyJraWQiOiI4UkNhdVMtNG9YNnRkd19fbnBHNURiY0N2OE5oM3BoR1RZaDUtc1pzQ0Q4IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULncyUENwOGRneThWT1p5a1Y3aG5ZWGpuYTc4RVRQc3pGUG92Q3kzWlAtMGciLCJpc3MiOiJodHRwczovL2xvZ2luLmd1ZXN0eS5jb20vb2F1dGgyL2F1c2Y2Y2ZjMmxTN3hCTGpKNWQ2IiwiYXVkIjoiaHR0cHM6Ly9ib29raW5nLmd1ZXN0eS5jb20iLCJpYXQiOjE2NzA0NTY5OTQsImV4cCI6MTY3MDU0MzM5NCwiY2lkIjoiMG9hN2QzNGgwZVdmNERGT2k1ZDciLCJzY3AiOlsiYm9va2luZ19lbmdpbmU6YXBpIl0sInJlcXVlc3RlciI6IkJPT0tJTkciLCJzdWIiOiIwb2E3ZDM0aDBlV2Y0REZPaTVkNyIsImFjY291bnRJZCI6IjYzMGYzZmZkNmMwODEwMDAzMmYxNGYxNCIsInVzZXJSb2xlcyI6W3sicm9sZUlkIjp7InBlcm1pc3Npb25zIjpbImxpc3Rpbmcudmlld2VyIl19fV0sImlhbSI6InYzIiwiYXBwbGljYXRpb25JZCI6IjBvYTdkMzRoMGVXZjRERk9pNWQ3In0.XaqU5yi16CA1uiymrITV4DSVbTGD8SvpysXGjmgmTtUadZMfx7BAxTn9RWGta7wEY_3qdXxlbK3fUcPZeU8HzlXTAJVuZGIHUYDdA3unhww84rjievAFOLucoczKxET-QHHP5FJgyQ6IrBRfTBiN05QNYEXRQ-CrhDRmQMnEJH4OBcEgQUhHtrxhBy0nItnkcnr-gjyASehYCPKw-3dq78zbadPTJRih26q4dHMuz-Yn23SsAnyj0-dkHXHSFVxTZ_bgCiH53EZjco5o_JF8MDOgMJgbwtHAB1V7YOtf8g9d_5v6LEgl0zx5c-FrxR6OSFekLEqDNrH1XQN12z2qiw'

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