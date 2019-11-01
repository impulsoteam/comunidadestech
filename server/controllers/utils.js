import axios from 'axios';

class Utils {
  async getLinkedinToken(code) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', '771l7h8iwbwuay');
    params.append('client_secret', 'VLPf7hiOrcRYAeYe');
    params.append('redirect_uri', 'http://localhost:3000/linkedin');
    params.append('code', code);
    const { data } = await axios.post(
      `https://www.linkedin.com/oauth/v2/accessToken`,
      params
    );
    return data.access_token;
  }

  async getLinkedinData(code) {
    const token = await this.getLinkedinToken(code);
    const { data } = await axios.get(
      `https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))`,
      {
        accept: 'json',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const linkedinId = data.id;
    const firstName = data.firstName.localized.pt_BR;
    const lastName = data.lastName.localized.pt_BR;
    const name = `${firstName} ${lastName}`;
    const avatar =
      data.profilePicture['displayImage~'].elements[0].identifiers[0]
        .identifier;

    return { name, avatar, linkedinId };
  }
}

export default new Utils();
