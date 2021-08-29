export const repoCard = ({ name, stargazers_count, owner }) => `
<div class="repos">
  <div class="repos__info">
    <span> Name: ${name} </span>
    <span> Owner: ${owner.login} </span>
    <span> Stars: ${stargazers_count} </span>
  </div>

  <div class="repos__close">&times;</div>
</div>
`;
