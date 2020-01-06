import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Muito curto!')
    .max(30, 'Muito longo!')
    .required('Item obrigatório'),
  logo: Yup.string()
    .required('Item obrigatório')
    .matches(
      /^(http(s)?:\/\/|www\.).*(\.jpg|\.jpeg|\.png)$/,
      'Deve ser um endereço de uma imagem JPG ou PNG'
    ),
  links: Yup.array().of(
    Yup.object().shape({
      type: Yup.string(),
      url: Yup.string()
        .url('Link inválido. Exemplo: http://site.com')
        .required('Item obrigatório'),
    })
  ),
  description: Yup.string().required('Item obrigatório'),
  type: Yup.string().required('Item obrigatório'),
  category: Yup.string().required('Item obrigatório'),
  tags: Yup.array()
    .required('Selecione pelo menos uma tag')
    .typeError('Selecione pelo menos uma tag'),

  members: Yup.number()
    .typeError('Valor deve ser em número')
    .required('Item obrigatório'),
  model: Yup.string().required('Item obrigatório'),
  location: Yup.object().when('model', {
    is: (model) => model !== 'online',
    then: Yup.object({
      country: Yup.string().required(
        'Campo obrigatório para este tipo de modalidade'
      ),
      state: Yup.string().when('country', {
        is: (country) => country === 'Brasil',
        then: Yup.string().required(
          'Campo obrigatório quando Brasil está selecionado '
        ),
      }),
      city: Yup.string().when('country', {
        is: (country) => country === 'Brasil',
        then: Yup.string().required(
          'Campo obrigatório quando Brasil está selecionado '
        ),
      }),
    }),
    otherwise: Yup.object({
      country: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
    }),
  }),
  globalProgram: Yup.object().shape({
    isParticipant: Yup.bool(),
    name: Yup.string().when('isParticipant', {
      is: (isParticipant) => isParticipant,
      then: Yup.string()
        .required('Item obrigatório')
        .min(2, 'Muito curto!')
        .max(30, 'Muito longo!'),
    }),
  }),
  creator: Yup.object().shape({
    rocketChat: Yup.string(),
  }),
  owner: Yup.string()
    .email('Endereço de email inválido')
    .required('Item obrigatório'),
});

export const errorMessages = {
  nameAlreadyExists: 'Comunidade já cadastrada',
  userNotSubscribed: 'Email ainda não está cadastrado no comunidades.tech',
  userSubscribed: 'Email está cadastrado no comunidades.tech',
  managerAlreadyListed: 'Usuário já é administrador desta comunidade',
};

export const CATEGORIES = [
  {
    label: 'Desenvolvimento de software',
    value: 'Desenvolvimento de software',
  },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'Infraestrutura', value: 'Infraestrutura' },
  { label: 'Agile', value: 'Agile' },
  { label: 'Dados', value: 'Dados' },
  { label: 'CyberSecurity', value: 'CyberSecurity' },
  { label: 'Games', value: 'Games' },
  { label: 'Design', value: 'Design' },
  { label: 'Tech Business', value: 'Tech Business' },
];

export const TAGS = [
  { label: 'Android', value: 'Android' },
  { label: 'iOS', value: 'iOS' },
  { label: 'Node.JS', value: 'Node.JS' },
  { label: 'Back-end', value: 'Back-end' },
  { label: 'Golang', value: 'Golang' },
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'Java', value: 'Java' },
  { label: 'Elixir', value: 'Elixir' },
  { label: 'C#', value: 'C#' },
  { label: 'PHP', value: 'PHP' },
  { label: 'Angular', value: 'Angular' },
  { label: 'React', value: 'React' },
  { label: 'React Native', value: 'React Native' },
  { label: 'Python', value: 'Python' },
  { label: '.NET', value: '.NET' },
  { label: 'Flutter', value: 'Flutter' },
  { label: 'Kotlin', value: 'Kotlin' },
  { label: 'Clojure', value: 'Clojure' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'Docker', value: 'Docker' },
  { label: 'AWS', value: 'AWS' },
  { label: 'GCloud', value: 'GCloud' },
  { label: 'Azure', value: 'Azure' },
  { label: 'K8S', value: 'K8S' },
  { label: 'Scrum', value: 'Scrum' },
  { label: 'Kanban', value: 'Kanban' },
  { label: 'LEAN', value: 'LEAN' },
  { label: 'Startups', value: 'Startups' },
  { label: 'Fintechs', value: 'Fintechs' },
  { label: 'Data Science', value: 'Data Science' },
  { label: 'Data Analysis', value: 'Data Analysis' },
  { label: 'Data Engineering', value: 'Data Engineering' },
  { label: 'Machine Learn', value: 'Machine Learn' },
  { label: 'Deep Learning', value: 'Deep Learning' },
  { label: 'Redes Neurais', value: 'Redes Neurais' },
  { label: 'Tensor Flow', value: 'Tensor Flow' },
  { label: 'Pytorch', value: 'Pytorch' },
  { label: 'LGPD', value: 'LGPD' },
  { label: 'OWASP', value: 'OWASP' },
  { label: 'PCI', value: 'PCI' },
  { label: 'Operation Systems', value: 'Operation Systems' },
  { label: 'Hardware', value: 'Hardware' },
  { label: 'UX', value: 'UX' },
  { label: 'UI', value: 'UI' },
  { label: 'Game design', value: 'Game design' },
];

export const TYPES = [
  { label: 'Discord', value: 'Discord' },
  {
    label: 'Grupo do Facebook',
    value: 'Grupo do Facebook',
  },
  { label: 'Meetup', value: 'Meetup' },
  { label: 'Podcast', value: 'Podcast' },
  { label: 'Slack', value: 'Slack' },
  { label: 'Telegram', value: 'Telegram' },
  { label: 'Whatsapp', value: 'Whatsapp' },
];

export const MODEL = [
  { label: 'Presencial', value: 'presential' },
  { label: 'Online', value: 'online' },
  { label: 'Ambos', value: 'both' },
];

export const GLOBAL_PROGRAM = [
  { label: 'Sim', value: true },
  { label: 'Não', value: false },
];

export const LINKS = [
  {
    label: (
      <span>
        <i className="fab fa-discord"></i> <strong>Discord</strong>
      </span>
    ),
    value: 'discord',
  },
  {
    label: (
      <span>
        <i className="fab fa-facebook-square"></i> <strong>Facebook</strong>
      </span>
    ),
    value: 'facebook',
  },
  {
    label: (
      <span>
        <i className="fab fa-instagram"></i> <strong>Instagram</strong>
      </span>
    ),
  },
  {
    label: (
      <span>
        <i className="fab fa-meetup"></i> <strong>Meetup</strong>
      </span>
    ),
    value: 'meetup',
  },
  {
    label: (
      <span>
        <i className="fas fa-link"></i> <strong>Outro</strong>
      </span>
    ),
    value: 'other',
  },
  {
    label: (
      <span>
        <i className="fab fa-slack"></i> <strong>Slack</strong>
      </span>
    ),
    value: 'slack',
  },
  {
    label: (
      <span>
        <i className="fab fa-telegram-plane"></i> <strong>Telegram</strong>
      </span>
    ),
    value: 'telegram',
  },
  {
    label: (
      <span>
        <i className="fab fa-twitter"></i> <strong>Twitter</strong>
      </span>
    ),
    value: 'twitter',
  },
  {
    label: (
      <span>
        <i className="fas fa-globe"></i> <strong>Site</strong>
      </span>
    ),
    value: 'url',
  },
  {
    label: (
      <span>
        <i className="fab fa-whatsapp"></i> <strong>Whatsapp</strong>
      </span>
    ),
    value: 'whatsapp',
  },
];
