import { debounce } from "./debounce";
import { searchRepos } from "./searchRepos";
import { completeItem } from "./templates/CompleteItem";
import { repoCard } from "./templates/RepoCard";

const useLastAdded = (parentContainer) => {
  const childs = parentContainer.children;
  const len = childs.length;
  const lastAdded = childs[len - 1];
  return lastAdded;
};

const windowLoadHandler = (e) => {
  let loadedRepos = [];
  const reposCardsContainer = document.querySelector(".app__repos");

  const $inputSearch = document.querySelector(".input-search");
  const clearInput = () => ($inputSearch.value = "");
  const inputHandler = debounce(async (e) => {
    const value = e.target.value.replace(/\s+/g, " ");

    loadedRepos = await searchRepos(value);
    clearComplete();

    loadedRepos.forEach((repos) => {
      appendCompleteItem(repos.name);

      const lastAdded = useLastAdded($autoComplete);

      lastAdded.addEventListener("click", (e) => {
        const value = e.target.textContent.trim();
        const binded = loadedRepos.find((rep) => rep.name === value);

        reposCardsContainer.insertAdjacentHTML("beforeend", repoCard(binded));
        clearComplete();
        clearInput();

        const lastAddedRepo = useLastAdded(reposCardsContainer);
        lastAddedRepo
          .querySelector(".repos__close")
          .addEventListener("click", (e) => {
            e.target.parentElement.remove();
          });
      });
    });
  }, 200);

  $inputSearch.addEventListener("input", inputHandler);

  const $autoComplete = document.querySelector(".auto-complete");
  const clearComplete = () => ($autoComplete.innerHTML = "");
  const appendCompleteItem = (value) => {
    $autoComplete.insertAdjacentHTML("beforeend", completeItem(value));
  };
};

export const run = () => {
  window.addEventListener("load", windowLoadHandler);
};
