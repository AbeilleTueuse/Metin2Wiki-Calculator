function showElement(element) {
  element.classList.remove("tabber-noactive");
}

function hideElement(element) {
  element.classList.add("tabber-noactive");
}

function removeAccent(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function toNormalForm(str) {
  return removeAccent(str).replace(/[^a-zA-Z0-9 ]/g, "");
}

function isValueInArray(value, array) {
  return array.indexOf(value) !== -1;
}

function copyObject(object) {
  var copy = {};
  for (var key in object) {
    copy[key] = object[key];
  }
  return copy;
}

function floorMultiplication(firstFactor, secondFactor) {
  return Math.floor((firstFactor * secondFactor).toFixed(8));
}

function numberFormat(number, precision) {
  return Math.round(number * 10 ** precision) / 10 ** precision;
}

function addKeyValue(object, key, value) {
  if (object.hasOwnProperty(key)) {
    object[key] += value;
  } else {
    object[key] = value;
  }
}

function addRowToTableResult(tableResult, value) {
  var newRow = tableResult.insertRow(-1);
  var firstCell = newRow.insertCell(0);

  firstCell.textContent = value;
  firstCell.colSpan = 2;

  newRow.style.fontWeight = "bold";
}

function addToTableResult(tableResult, damagesWeighted, minMaxDamages) {
  var firstIteration = true;

  for (var damages in damagesWeighted) {
    if (firstIteration && minMaxDamages) {
      damages = parseInt(damages);
      if (damages < minMaxDamages.min) {
        minMaxDamages.min = damages;
      }
      firstIteration = false;
    }

    var newRow = tableResult.insertRow(-1);
    var firstCell = newRow.insertCell(0);

    firstCell.textContent = damages;

    var secondCell = newRow.insertCell(1);
    secondCell.textContent =
      numberFormat(damagesWeighted[damages] * 100, 3)
        .toString()
        .replace(".", ",") + " %";
  }

  damages = parseInt(damages);
  if (minMaxDamages && damages > minMaxDamages.max) {
    minMaxDamages.max = damages;
  }
}

function clearTableResult(tableResult) {
  var tableHeaderRowCount = 1;
  var rowCount = tableResult.rows.length;

  for (var rowIndex = tableHeaderRowCount; rowIndex < rowCount; rowIndex++) {
    tableResult.deleteRow(tableHeaderRowCount);
  }
}

function filterClass(selectedRace, classChoice, selectValueIsChanged = false) {
  showElement(classChoice.parentElement);

  for (var option of classChoice.options) {
    if (option.getAttribute("data-race") === selectedRace) {
      if (!selectValueIsChanged) {
        classChoice.value = option.value;
        selectValueIsChanged = true;
      }
      showElement(option);
    } else {
      hideElement(option);
    }
  }
  if (selectedRace == "lycan") {
    hideElement(classChoice.parentElement);
  }
}

function filterWeapon(
  selectedRace,
  weapon,
  weaponCategory,
  selectValueIsChanged = false
) {
  var allowedWeaponsPerRace = {
    warrior: [0, 3, 8],
    ninja: [0, 1, 2, 8],
    sura: [0, 7, 8],
    shaman: [4, 6, 8],
    lycan: [5, 8],
  };
  var allowedWeapons = allowedWeaponsPerRace[selectedRace];

  if (!selectValueIsChanged) {
    var weaponType = weaponData[weapon.value][1];

    if (!isValueInArray(weaponType, allowedWeapons)) {
      weapon.value = 0;
    }
  }

  var children = weaponCategory.children;

  for (var index = 0; index < children.length; index++) {
    var child = children[index];

    if (isValueInArray(index, allowedWeapons)) {
      showElement(child);
    } else {
      hideElement(child);
    }
  }
}

function getSelectedWeapon(weaponCategory) {
  return weaponCategory.querySelector("input[type='radio']:checked");
}

function handleWeaponDisplay(weaponDisplay, newWeapon, weaponValue) {
  var newImage = newWeapon.nextElementSibling.cloneNode();
  var newText = document.createElement("span");
  var oldImage = weaponDisplay.firstChild;
  var oldText = oldImage.nextElementSibling;

  newText.textContent = " " + weaponData[weaponValue][0] + " ";

  weaponDisplay.replaceChild(newImage, oldImage);
  weaponDisplay.replaceChild(newText, oldText);
}

function filterUpgrade(
  selectedRace,
  weaponUpgrade,
  weaponValue,
  randomAttackValue,
  randomMagicAttackValue,
  currentUpgrade
) {
  var weapon = weaponData[weaponValue];

  if (isValueInArray("serpent", weapon[0].toLowerCase())) {
    showElement(randomAttackValue);

    if (selectedRace === "sura" || selectedRace === "shaman") {
      showElement(randomMagicAttackValue);
    }
  } else {
    hideElement(randomAttackValue);
    hideElement(randomMagicAttackValue);
  }

  var upgradeNumber = weapon[3].length;

  if (upgradeNumber <= 1) {
    hideElement(weaponUpgrade.parentElement);
  } else {
    showElement(weaponUpgrade.parentElement);

    weaponUpgrade.innerHTML = "";

    for (var upgrade = 0; upgrade < upgradeNumber; upgrade++) {
      var option = document.createElement("option");
      option.value = upgrade;
      option.textContent = "+" + upgrade;
      weaponUpgrade.appendChild(option);
    }
    if (currentUpgrade === undefined) {
      option.selected = true;
    } else {
      weaponUpgrade.value = currentUpgrade;
      currentUpgrade = undefined;
    }
  }
}

function filterState(selectedState, polymorphMonster) {
  if (selectedState === "polymorph") {
    showElement(polymorphMonster.parentElement);
  } else {
    hideElement(polymorphMonster.parentElement);
  }
}

function filterCheckbox(checkbox, element) {
  if (checkbox.checked) {
    showElement(element);
  } else {
    hideElement(element);
  }
}

function filterSkills(selectedClass, skillElementsToFilter) {
  for (var element of skillElementsToFilter) {
    if (isValueInArray(selectedClass, element.dataset.class)) {
      showElement(element);
    } else {
      hideElement(element);
    }
  }
}

function filterAttackTypeSelection(attacker, attackTypeSelection) {
  var attackerClass = attacker.class;
  var selectedOption =
    attackTypeSelection.options[attackTypeSelection.selectedIndex];

  for (var option of attackTypeSelection.options) {
    optionClass = option.dataset.class;

    if (optionClass) {
      if (
        optionClass === attackerClass &&
        attacker[option.value] &&
        attacker.state !== "polymorph"
      ) {
        showElement(option);
      } else {
        hideElement(option);

        if (selectedOption === option) {
          attackTypeSelection.selectedIndex = 0;
        }
      }
    }
  }
}

function filterForm(characters, battle) {
  var characterCreation = characters.characterCreation;

  characterCreation.addEventListener("change", function (event) {
    var target = event.target;
    var targetName = target.name;

    switch (targetName) {
      case "race":
        var selectedRace = target.value;
        var classChoice = characterCreation.class;
        var weapon = characterCreation.weapon;

        filterClass(selectedRace, classChoice);
        filterWeapon(selectedRace, weapon, characters.weaponCategory);

        var newWeapon = getSelectedWeapon(characters.weaponCategory);
        handleWeaponDisplay(characters.weaponDisplay, newWeapon, weapon.value);
        filterUpgrade(
          selectedRace,
          characterCreation.weaponUpgrade,
          weapon.value,
          characters.randomAttackValue,
          characters.randomMagicAttackValue
        );
        filterSkills(classChoice.value, characters.skillElementsToFilter);

        if (characterCreation.name.value === battle.attackerSelection.value) {
          battle.resetAttackType = true;
        }
        break;
      case "class":
        filterSkills(target.value, characters.skillElementsToFilter);

        if (characterCreation.name.value === battle.attackerSelection.value) {
          battle.resetAttackType = true;
        }
        break;
      case "weapon":
        handleWeaponDisplay(
          characters.weaponDisplay,
          target,
          characterCreation.weapon.value
        );
        filterUpgrade(
          characterCreation.race.value,
          characterCreation.weaponUpgrade,
          target.value,
          characters.randomAttackValue,
          characters.randomMagicAttackValue
        );
        break;
      case "state":
        filterState(target.value, characterCreation.polymorphMonster);
        if (characterCreation.name.value === battle.attackerSelection.value) {
          battle.resetAttackType = true;
        }
        break;
      case "lowRank":
        filterCheckbox(target, characterCreation.playerRank.parentElement);
        break;
      case "blessingActivation":
        filterCheckbox(target, characters.blessingCreation);
        break;
    }

    if (targetName.startsWith("attackSkill")) {
      battle.resetAttackType = true;
    }
  });
}

function getSavedCharacters() {
  var savedCharacters = localStorage.getItem("savedCharactersCalculator");

  if (savedCharacters) {
    return JSON.parse(savedCharacters);
  }
  return {};
}

function getSavedMonsters() {
  var savedMonsters = localStorage.getItem("savedMonstersCalculator");

  if (savedMonsters) {
    return JSON.parse(savedMonsters);
  }
  return [];
}

function addUniquePseudo(characterDataObject, savedCharactersPseudo) {
  var characterPseudo = characterDataObject.name;
  var originalPseudo = characterPseudo;
  var count = 0;

  var regex = /(.*)(\d)$/;
  var match = characterPseudo.match(regex);

  if (match) {
    originalPseudo = match[1];
    count = match[2];
  }

  while (isValueInArray(characterPseudo, savedCharactersPseudo)) {
    characterPseudo = originalPseudo + count;
    count++;
  }

  characterDataObject.name = characterPseudo;
  return [characterDataObject, characterPseudo];
}

function convertToNumber(value) {
  var valueNumber = Number(value);
  return isNaN(valueNumber) ? value : valueNumber;
}

function updateSavedCharacters(savedCharacters) {
  localStorage.setItem(
    "savedCharactersCalculator",
    JSON.stringify(savedCharacters)
  );
}

function updateSavedMonsters(savedMonsters) {
  localStorage.setItem(
    "savedMonstersCalculator",
    JSON.stringify(savedMonsters)
  );
}

function saveCharacter(
  savedCharacters,
  characterCreation,
  battle,
  newCharacter,
  characterDataObject
) {
  if (!characterDataObject) {
    var characterData = new FormData(characterCreation);
    var characterDataObject = {};

    characterData.forEach(function (value, key) {
      characterDataObject[key] = convertToNumber(value);
    });
  }

  savedCharacters[characterDataObject.name] = characterDataObject;
  updateSavedCharacters(savedCharacters);

  if (newCharacter) {
    addBattleChoice(battle, characterDataObject.name);
  }

  if (battle.resetAttackType) {
    filterAttackTypeSelection(characterDataObject, battle.attackTypeSelection);
    battle.resetAttackType = false;
  }
}

function saveButtonGreen(characters, animation) {
  if (animation) {
    characters.saveButton.classList.add("save-animation");
  } else {
    characters.saveButton.classList.remove("save-animation");
  }
  characters.saveButton.classList.remove("unsaved-button");
}

function saveButtonOrange(characters) {
  characters.saveButton.classList.remove("save-animation");
  characters.saveButton.classList.add("unsaved-button");
}

function characterCreationListener(characters, battle) {
  characters.characterCreation.addEventListener("submit", function (event) {
    event.preventDefault();

    if (characters.unsavedChanges) {
      saveCharacter(
        characters.savedCharacters,
        characters.characterCreation,
        battle
      );
      saveButtonGreen(characters, true);
      characters.unsavedChanges = false;
    }
  });
}

function downloadCharacter(character) {
  var content = JSON.stringify(character);
  var link = document.createElement("a");
  var blob = new Blob([content], { type: "text/plain" });
  var blobURL = URL.createObjectURL(blob);

  link.href = blobURL;
  link.download = character.name + ".txt";
  link.click();
  URL.revokeObjectURL(blobURL);
}

function uploadCharacter(
  characters,
  characterTemplate,
  charactersContainer,
  battle
) {
  var fileInput = document.createElement("input");

  fileInput.type = "file";
  fileInput.accept = ".txt";
  fileInput.multiple = true;
  fileInput.click();

  fileInput.addEventListener("change", function (event) {
    var selectedFiles = event.target.files;
    var selectFilesLength = selectedFiles.length;

    hideElement(characters.characterCreation);

    for (var fileIndex = 0; fileIndex < selectFilesLength; fileIndex++) {
      var selectedFile = selectedFiles[fileIndex];

      if (selectedFile.type === "text/plain") {
        var reader = new FileReader();
        reader.onload = function (e) {
          var fileContent = e.target.result;
          try {
            var characterDataObject = JSON.parse(fileContent);
            var characterPseudo = characterDataObject.name;

            if (characterPseudo) {
              characterPseudo = validPseudo(characterPseudo);
              [characterDataObject, characterPseudo] = addUniquePseudo(
                characterDataObject,
                Object.keys(characters.savedCharacters)
              );
              var selectedCharacter = handleNewCharacter(
                characters,
                characterTemplate,
                charactersContainer,
                battle,
                characterPseudo
              )[0];

              if (selectFilesLength === 1) {
                updateForm(
                  characterDataObject,
                  characters.characterCreation,
                  characters,
                  selectedCharacter
                );
              }

              saveCharacter(
                characters.savedCharacters,
                characters.characterCreation,
                battle,
                true,
                characterDataObject
              );
            }
          } catch (error) {
            if (error.name === "TypeError") {
              // delete the character
            }
          }
        };
        reader.readAsText(selectedFile);
      }
    }
  });
}

function deleteCharacter(characters, pseudo, element, battle) {
  battle.battleForm.reset();
  delete characters.savedCharacters[pseudo];
  element.remove();

  updateSavedCharacters(characters.savedCharacters);
  removeBattleChoice(battle, pseudo);

  if (
    !Object.keys(characters.savedCharacters).length ||
    characters.characterCreation.name.value === pseudo
  ) {
    saveButtonGreen(characters);
    characters.unsavedChanges = false;
    hideElement(characters.characterCreation);
  }
}

function deleteMonster(characters, monsterName, element, battle) {
  battle.battleForm.reset();
  characters.savedMonsters.splice(
    characters.savedMonsters.indexOf(monsterName),
    1
  );
  element.remove();

  updateSavedMonsters(characters.savedMonsters);
  removeBattleChoice(battle, monsterName);
}

function handleStyle(characters, selectedElement) {
  var currentCharacter = characters.currentCharacter;

  if (currentCharacter) {
    currentCharacter.classList.remove("selected-character");
  }

  selectedElement.classList.add("selected-character");
  characters.currentCharacter = selectedElement;
}

function updateForm(formData, characterCreation, characters, selectedElement) {
  saveButtonGreen(characters);
  showElement(characterCreation);
  handleStyle(characters, selectedElement);

  characterCreation.reset();

  for (var [name, value] of Object.entries(formData)) {
    var formElement = characterCreation[name];

    if (!formElement) {
      continue;
    }

    if (formElement.type === "checkbox") {
      if (value === "on") {
        formElement.checked = true;
      }
    } else {
      formElement.value = value;
    }
  }
  var selectedRace = characterCreation.race.value;
  var classChoice = characterCreation.class;
  var weapon = characterCreation.weapon;

  filterClass(selectedRace, classChoice, true);
  filterWeapon(selectedRace, weapon, characters.weaponCategory, true);

  var newWeapon = getSelectedWeapon(characters.weaponCategory);

  handleWeaponDisplay(characters.weaponDisplay, newWeapon, weapon.value);
  filterUpgrade(
    selectedRace,
    characterCreation.weaponUpgrade,
    weapon.value,
    characters.randomAttackValue,
    characters.randomMagicAttackValue,
    formData.weaponUpgrade
  );
  filterState(
    characterCreation.state.value,
    characterCreation.polymorphMonster
  );
  filterCheckbox(
    characterCreation.lowRank,
    characterCreation.playerRank.parentElement
  );
  filterCheckbox(
    characterCreation.blessingActivation,
    characters.blessingCreation
  );
  filterSkills(classChoice.value, characters.skillElementsToFilter);
}

function handleClickOnCharacter(
  spanInput,
  target,
  characters,
  characterElement,
  battle,
  edition
) {
  var displayedPseudo = characters.characterCreation.name.value;
  var pseudo = spanInput.dataset.name;

  if (edition) {
    if (!characters.unsavedChanges) {
      updateForm(
        characters.savedCharacters[pseudo],
        characters.characterCreation,
        characters,
        characterElement
      );
    } else if (displayedPseudo === pseudo) {
      // pass
    } else {
      var result = confirm(
        "Voulez-vous continuer ? Les dernières modifications ne seront pas sauvegardées."
      );

      if (result) {
        updateForm(
          characters.savedCharacters[pseudo],
          characters.characterCreation,
          characters,
          characterElement
        );
        characters.unsavedChanges = false;
      }
    }
  } else {
    if (target.tagName === "path") {
      target = target.parentElement;
    }

    switch (target.dataset.icon) {
      case "duplicate":
        if (!characters.unsavedChanges) {
          addNewCharacter(
            characters,
            characters.newCharacterTemplate,
            characters.charactersContainer,
            battle,
            pseudo
          );
        } else {
          var result = confirm(
            "Voulez-vous continuer ? Les dernières modifications ne seront pas sauvegardées."
          );

          if (result) {
            addNewCharacter(
              characters,
              characters.newCharacterTemplate,
              characters.charactersContainer,
              battle,
              pseudo
            );
            saveButtonGreen(characters);
            characters.unsavedChanges = false;
          }
        }
        break;

      case "download":
        downloadCharacter(characters.savedCharacters[pseudo]);
        break;

      case "delete":
        var result = confirm(
          "Voulez-vous vraiment supprimer définitivement le personnage " +
            pseudo +
            " ?"
        );
        if (result) {
          deleteCharacter(characters, pseudo, characterElement, battle);
        }
        break;
    }
  }
}

function handleNewCharacter(
  characters,
  characterTemplate,
  charactersContainer,
  battle,
  pseudo
) {
  var newCharacterTemplate = characterTemplate.cloneNode(true);
  var spanInput = newCharacterTemplate.querySelector("span.input");

  newCharacterTemplate.setAttribute("tabindex", "0");
  charactersContainer.appendChild(newCharacterTemplate);

  if (pseudo) {
    spanInput.textContent = pseudo;
    spanInput.setAttribute("data-name", pseudo);
  }

  newCharacterTemplate.addEventListener("click", function (event) {
    var target = event.target;

    if (target.tagName === "path" || target.tagName === "svg") {
      handleClickOnCharacter(
        spanInput,
        target,
        characters,
        newCharacterTemplate,
        battle
      );
    } else {
      handleClickOnCharacter(
        spanInput,
        null,
        characters,
        newCharacterTemplate,
        battle,
        true
      );
    }
  });

  newCharacterTemplate.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.target.click();
    }
  });

  return [newCharacterTemplate, spanInput];
}

function validPseudo(pseudo) {
  var newPseudo = pseudo.replace(/[^A-Za-z0-9]+/g, "");

  if (!newPseudo) {
    return "Pseudo";
  }

  return newPseudo;
}

function addNewCharacter(
  characters,
  characterTemplate,
  charactersContainer,
  battle,
  pseudoToDuplicate
) {
  function editAndSetCharacterPseudoInput(selectedCharacter, spanInput) {
    var maxPseudoLength = 15;

    var selection = window.getSelection();
    var range = document.createRange();

    if (pseudoToDuplicate) {
      spanInput.textContent = pseudoToDuplicate;
    }

    spanInput.contentEditable = true;
    spanInput.focus();
    range.selectNodeContents(spanInput);
    selection.removeAllRanges();
    selection.addRange(range);

    function pseudoValidation() {
      var characterPseudo = validPseudo(spanInput.textContent);
      var characterDataObject = { name: characterPseudo };

      if (pseudoToDuplicate) {
        characterDataObject = copyObject(
          characters.savedCharacters[pseudoToDuplicate]
        );
        characterDataObject.name = characterPseudo;
      }

      [characterDataObject, characterPseudo] = addUniquePseudo(
        characterDataObject,
        Object.keys(characters.savedCharacters)
      );

      selection.removeAllRanges();
      spanInput.contentEditable = false;
      spanInput.textContent = characterPseudo;
      spanInput.setAttribute("data-name", characterPseudo);

      updateForm(
        characterDataObject,
        characters.characterCreation,
        characters,
        selectedCharacter
      );
      saveCharacter(
        characters.savedCharacters,
        characters.characterCreation,
        battle,
        true
      );
    }

    function handleMaxLength(event) {
      if (spanInput.textContent.length > maxPseudoLength) {
        spanInput.textContent = spanInput.textContent.slice(0, maxPseudoLength);
        range.setStart(spanInput.childNodes[0], maxPseudoLength);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    function handleBlur() {
      spanInput.removeEventListener("blur", handleBlur);
      spanInput.removeEventListener("input", handleMaxLength);
      pseudoValidation();
    }

    function handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();

        spanInput.removeEventListener("keydown", handleKeyDown);
        spanInput.removeEventListener("blur", handleBlur);
        spanInput.removeEventListener("input", handleMaxLength);

        pseudoValidation();
      }
    }

    spanInput.addEventListener("input", handleMaxLength);
    spanInput.addEventListener("keydown", handleKeyDown);
    spanInput.addEventListener("blur", handleBlur);
  }

  hideElement(characters.characterCreation);
  var [selectedCharacter, spanInput] = handleNewCharacter(
    characters,
    characterTemplate,
    charactersContainer,
    battle
  );

  editAndSetCharacterPseudoInput(selectedCharacter, spanInput);
}

function handleFocus() {
  var tooltipLinks = document.querySelectorAll("div.tooltip a");
  tooltipLinks.forEach(function (link) {
    link.setAttribute("tabindex", -1);
  });
}

function characterManagement(characters, battle) {
  var characterTemplate = characters.newCharacterTemplate;
  var charactersContainer = characters.charactersContainer;

  Object.keys(characters.savedCharacters).forEach(function (pseudo) {
    handleNewCharacter(
      characters,
      characterTemplate,
      charactersContainer,
      battle,
      pseudo
    );
  });

  characters.addNewCharacterButton.addEventListener("click", function (event) {
    if (!characters.unsavedChanges) {
      addNewCharacter(
        characters,
        characterTemplate,
        charactersContainer,
        battle
      );
    } else {
      var result = confirm(
        "Voulez-vous continuer ? Les dernières modifications ne seront pas sauvegardées."
      );

      if (result) {
        addNewCharacter(
          characters,
          characterTemplate,
          charactersContainer,
          battle
        );
        saveButtonGreen(characters);
        characters.unsavedChanges = false;
      }
    }
  });

  characters.uploadCharacter.addEventListener("click", function (event) {
    uploadCharacter(characters, characterTemplate, charactersContainer, battle);
  });

  characters.characterCreation.addEventListener("change", function () {
    saveButtonOrange(characters);
    characters.unsavedChanges = true;
  });

  filterForm(characters, battle);
  characterCreationListener(characters, battle);
  handleFocus();

  window.addEventListener("beforeunload", function (event) {
    if (characters.unsavedChanges) {
      event.preventDefault();
      event.returnValue = "";
      return "";
    }
  });
}

function handleNewMonster(
  characters,
  monsterTemplate,
  monstersContainer,
  battle,
  monsterName,
  monsterList
) {
  var newMonsterTemplate = monsterTemplate.cloneNode(true);
  var spanInput = newMonsterTemplate.querySelector("span.input");
  var deleteSvg = newMonsterTemplate.querySelector("svg");

  spanInput.textContent = monsterName;
  monstersContainer.appendChild(newMonsterTemplate);

  newMonsterTemplate.setAttribute("tabindex", "0");
  newMonsterTemplate.setAttribute("data-name", monsterName);
  monstersContainer.appendChild(newMonsterTemplate);

  deleteSvg.addEventListener("click", function (event) {
    deleteMonster(characters, monsterName, newMonsterTemplate, battle);
    var inputMonster = monsterList.querySelector(
      "input[name='" + monsterName + "']"
    );
    inputMonster.checked = false;
  });
}

function monsterManagement(characters, battle) {
  function handleDropdown(searchMonster, monsterList) {
    searchMonster.addEventListener("focus", function (event) {
      showElement(monsterList);
    });

    document.addEventListener("mousedown", function (event) {
      var target = event.target;
      if (!monsterList.contains(target) && !searchMonster.contains(target)) {
        hideElement(monsterList);
      }
    });
  }

  function addMonsterNames(monsterList) {
    var monsterIndex = 0;

    for (var monsterName in monsterData) {
      var li = document.createElement("li");
      var label = document.createElement("label");
      var input = document.createElement("input");
      var textNode = document.createTextNode(monsterName);

      label.htmlFor = "monster" + monsterIndex;
      input.id = "monster" + monsterIndex;
      input.type = "checkbox";

      input.name = monsterName;

      label.appendChild(input);
      label.appendChild(textNode);
      li.appendChild(label);
      monsterList.appendChild(li);

      monsterIndex++;
    }
  }

  function filterNames(searchMonster, monsterList) {
    var debounceTimer;

    searchMonster.addEventListener("input", function (event) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        var value = toNormalForm(event.target.value);
        for (var element of monsterList.children) {
          if (!isValueInArray(value, toNormalForm(element.textContent))) {
            hideElement(element);
          } else {
            showElement(element);
          }
        }
      }, 500);
    });
  }

  var monsterTemplate = characters.newMonsterTemplate;
  var monstersContainer = characters.monstersContainer;
  var monsterList = characters.monsterList;
  var searchMonster = characters.searchMonster;
  var monsterListForm = characters.monsterListForm;

  handleDropdown(searchMonster, monsterList);
  addMonsterNames(monsterList, characters.monsterListTemplate);
  filterNames(searchMonster, monsterList);

  characters.savedMonsters.forEach(function (monsterName) {
    handleNewMonster(
      characters,
      monsterTemplate,
      monstersContainer,
      battle,
      monsterName,
      monsterList
    );
    var inputMonster = monsterList.querySelector(
      "input[name='" + monsterName + "']"
    );

    if (inputMonster) {
      inputMonster.checked = true;
    } else {
      deleteMonster(characters, monsterName, newMonsterTemplate, battle);
    }
  });

  monsterListForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  monsterListForm.addEventListener("change", function (event) {
    var target = event.target;
    var monsterName = target.name;

    if (monsterName === "search-monster") {
      return;
    }

    if (target.checked) {
      handleNewMonster(
        characters,
        monsterTemplate,
        monstersContainer,
        battle,
        monsterName,
        monsterList
      );

      characters.savedMonsters.push(monsterName);
      updateSavedMonsters(characters.savedMonsters);
      addBattleChoice(battle, monsterName, true);
    } else {
      var currentMonsterTemplate = monstersContainer.querySelector(
        "[data-name='" + monsterName + "']"
      );
      deleteMonster(characters, monsterName, currentMonsterTemplate, battle);
    }
  });
}

function removeBattleChoice(battle, name) {
  var battleSelects = [battle.attackerSelection, battle.victimSelection];

  battleSelects.forEach(function (battleSelect) {
    for (
      var optionIndex = 0;
      optionIndex < battleSelect.options.length;
      optionIndex++
    ) {
      if (battleSelect.options[optionIndex].value === name) {
        battleSelect.remove(optionIndex);
        break;
      }
    }
  });
}

function addBattleChoice(battle, name, isMonster = false) {
  function createOption(text) {
    var option = document.createElement("option");
    option.textContent = text;
    option.value = text;

    if (!isMonster) {
      option.classList.add("notranslate");
    }

    return option;
  }

  if (isMonster && monsterData[name][1]) {
    // pass
  } else {
    battle.attackerSelection.appendChild(createOption(name));
  }

  battle.victimSelection.appendChild(createOption(name));
}

function updateBattleChoice(characters, battle) {
  var keys = Object.keys(characters.savedCharacters);

  for (var index = 0; index < keys.length; index++) {
    var pseudo = keys[index];
    addBattleChoice(battle, pseudo);
  }

  characters.savedMonsters.forEach(function (monsterName) {
    addBattleChoice(battle, monsterName, true);
  });
}

function isPC(character) {
  if (character.race === 0 || character.race === 1) {
    return false;
  }
  return true;
}

function isBoss(character) {
  return character.race === 0 && character.rank >= 5;
}

function isStone(character) {
  return character.race === 1;
}

function isMagicClass(character) {
  return character.race === "shaman" || character.class === "black_magic";
}

function isPolymorph(character) {
  return character.state === "polymorph";
}

function isRiding(character) {
  return character.state === "horse";
}

function isBow(weapon) {
  return weapon[1] === 2;
}

function calcAttackFactor(attacker, victim) {
  function calcCoeffK(dex, level) {
    return Math.min(90, Math.floor((2 * dex + level) / 3));
  }

  var K1 = calcCoeffK(attacker.polymorphDex, attacker.level);
  var K2 = calcCoeffK(victim.polymorphDex, attacker.level);

  var AR = (K1 + 210) / 300;
  var ER = (((2 * K2 + 5) / (K2 + 95)) * 3) / 10;

  return AR - ER;
}

function calcMainAttackValue(attacker, attackerWeapon) {
  var leadership = 0;
  var rawWeaponAttackValue = 0;

  if (isPC(attacker)) {
    var rawWeaponAttackValue = attackerWeapon[3][attacker.weaponUpgrade];

    if (!rawWeaponAttackValue) {
      rawWeaponAttackValue = 0;
    }

    leadership = attacker.leadership;
  }

  return 2 * (attacker.level + rawWeaponAttackValue) + leadership;
}

function calcStatAttackValue(character) {
  switch (character.race) {
    case "warrior":
    case "sura":
      return 2 * character.str;
    case "ninja":
      return Math.floor((1 / 4) * (character.str + 7 * character.dex));
    case "shaman":
      return Math.floor((1 / 3) * (5 * character.int + character.dex));
    case "lycan":
      return character.vit + 2 * character.dex;
    default:
      return 2 * character.str;
  }
}

function calcSecondaryAttackValue(attacker, attackerWeapon) {
  var attackValueOther = 0;

  var minAttackValue = 0;
  var maxAttackValue = 0;

  var minAttackValueSlash = 0;
  var maxAttackValueSlash = 0;

  if (isPC(attacker)) {
    if (isValueInArray("serpent", attackerWeapon[0].toLowerCase())) {
      var rawAttackValue = attackerWeapon[3][attacker.weaponUpgrade];

      minAttackValue = attacker.minAttackValueRandom - rawAttackValue;
      maxAttackValue = attacker.maxAttackValueRandom - rawAttackValue;

      minAttackValue = Math.max(0, minAttackValue);
      maxAttackValue = Math.max(minAttackValue, maxAttackValue);
    } else {
      minAttackValue = attackerWeapon[2][2];
      maxAttackValue = attackerWeapon[2][3];
    }

    minAttackValueSlash = Math.min(
      attacker.minAttackValueSlash,
      attacker.maxAttackValueSlash
    );
    maxAttackValueSlash = Math.max(
      attacker.minAttackValueSlash,
      attacker.maxAttackValueSlash
    );

    attackValueOther += attacker.attackValue;

    if (isBow(attackerWeapon) && !isPolymorph(attacker)) {
      attackValueOther += 25;
    }
  } else {
    minAttackValue = attacker.minAttackValue;
    maxAttackValue = attacker.maxAttackValue;
  }

  minAttackValue += attacker.minAttackValuePolymorph;
  maxAttackValue += attacker.maxAttackValuePolymorph;

  attackValueOther += attacker.statAttackValue;
  attackValueOther += attacker.horseAttackValue;

  var weaponInterval = maxAttackValue - minAttackValue + 1;
  var slashInterval = maxAttackValueSlash - minAttackValueSlash + 1;

  var totalCardinal = weaponInterval * slashInterval * 10000;
  var minInterval = Math.min(weaponInterval, slashInterval);

  minAttackValue += minAttackValueSlash;
  maxAttackValue += maxAttackValueSlash;

  return [
    minAttackValue,
    maxAttackValue,
    attackValueOther,
    minInterval,
    totalCardinal,
  ];
}

function calcMagicAttackValue(attacker, attackerWeapon) {
  var minMagicAttackValue = 0;
  var maxMagicAttackValue = 0;

  var minMagicAttackValueSlash = 0;
  var maxMagicAttackValueSlash = 0;

  if (isValueInArray("serpent", attackerWeapon[0].toLowerCase())) {
    minMagicAttackValue = attacker.minMagicAttackValueRandom;
    maxMagicAttackValue = attacker.maxMagicAttackValueRandom;

    maxMagicAttackValue = Math.max(minMagicAttackValue, maxMagicAttackValue);
  } else {
    var rawWeaponAttackValue = attackerWeapon[3][attacker.weaponUpgrade];

    if (!rawWeaponAttackValue) {
      rawWeaponAttackValue = 0;
    }

    minMagicAttackValue = attackerWeapon[2][0] + rawWeaponAttackValue;
    maxMagicAttackValue = attackerWeapon[2][1] + rawWeaponAttackValue;
  }

  minMagicAttackValueSlash = Math.min(
    attacker.minMagicAttackValueSlash,
    attacker.maxMagicAttackValueSlash
  );
  maxMagicAttackValueSlash = Math.max(
    attacker.minMagicAttackValueSlash,
    attacker.maxMagicAttackValueSlash
  );

  var weaponInterval = maxMagicAttackValue - minMagicAttackValue + 1;
  var slashInterval = maxMagicAttackValueSlash - minMagicAttackValueSlash + 1;

  var totalCardinal = weaponInterval * slashInterval * 10000;
  var minInterval = Math.min(weaponInterval, slashInterval);

  minMagicAttackValue += minMagicAttackValueSlash;
  maxMagicAttackValue += maxMagicAttackValueSlash;

  return [minMagicAttackValue, maxMagicAttackValue, minInterval, totalCardinal];
}

function getPolymorphPower(polymorphPoint, polymorphPowerTable) {
  return polymorphPowerTable[polymorphPoint];
}

function getSkillPower(skillPoint, skillPowerTable) {
  return skillPowerTable[skillPoint];
}

function getMarriageBonusValue(character, marriageTable, itemName) {
  var index;
  var lovePoint = character.lovePoint;

  if (lovePoint < 65) {
    index = 0;
  } else if (lovePoint < 80) {
    index = 1;
  } else if (lovePoint < 100) {
    index = 2;
  } else {
    index = 3;
  }

  return marriageTable[itemName][index];
}

function calcDamageWithPrimaryBonuses(damages, battleValues) {
  damages = floorMultiplication(
    damages * battleValues.attackValueCoeff + battleValues.adjustCoeff,
    1
  );
  damages += battleValues.attackValueMarriage;
  damages = floorMultiplication(
    damages,
    battleValues.monsterResistanceMarriageCoeff
  );
  damages = floorMultiplication(damages, battleValues.monsterResistanceCoeff);
  damages = floorMultiplication(damages, battleValues.typeBonusCoeff);
  damages +=
    floorMultiplication(damages, battleValues.raceBonusCoeff) -
    floorMultiplication(damages, battleValues.raceResistanceCoeff);
  damages = floorMultiplication(damages, battleValues.stoneBonusCoeff);
  damages = floorMultiplication(damages, battleValues.monsterBonusCoeff);

  var elementDamages = 0;
  for (var elementBonusCoeff of battleValues.elementBonusCoeff) {
    elementDamages += floorMultiplication(damages, elementBonusCoeff);
  }
  damages += elementDamages;

  damages = floorMultiplication(damages, battleValues.damageMultiplier);

  return damages;
}

function calcDamageWithSecondaryBonuses(
  damages,
  battleValues,
  damagesType,
  minPiercingDamages
) {
  damages = floorMultiplication(damages, battleValues.magicResistanceCoeff);
  damages = floorMultiplication(damages, battleValues.weaponDefenseCoeff);
  damages = floorMultiplication(damages, battleValues.blessingBonusCoeff);

  if (damagesType.criticalHit) {
    damages *= 2;
  }

  if (damagesType.piercingHit) {
    damages += battleValues.defense + Math.min(0, minPiercingDamages);
    damages = floorMultiplication(damages, battleValues.extraPiercingHitCoeff);
  }

  damages = floorMultiplication(damages, battleValues.averageDamageCoeff);
  damages = floorMultiplication(
    damages,
    battleValues.averageDamageResistanceCoeff
  );
  damages = floorMultiplication(
    damages,
    battleValues.skillDamageResistanceCoeff
  );

  damages = floorMultiplication(damages, battleValues.rankBonusCoeff);
  damages = Math.max(0, damages + Math.floor(battleValues.defensePercent));
  damages += Math.min(
    300,
    floorMultiplication(damages, battleValues.damageBonusCoeff)
  );
  damages = floorMultiplication(damages, battleValues.empireMalusCoeff);

  return damages;
}

function calcSkillDamageWithSecondaryBonuses(
  damages,
  battleValues,
  damagesType,
  minPiercingDamages
) {
  damages = floorMultiplication(damages, battleValues.magicResistanceCoeff);
  damages = floorMultiplication(damages, battleValues.weaponDefenseCoeff);

  damages -= battleValues.defense;

  damages = floorMultiplication(damages, battleValues.skillWardCoeff);
  damages = floorMultiplication(damages, battleValues.skillBonusCoeff);
  damages = floorMultiplication(damages, battleValues.specificSkillBonusCoeff);

  if (damagesType.criticalHit) {
    damages *= 2;
  }

  if (damagesType.piercingHit) {
    damages +=
      battleValues.piercingHitDefense + Math.min(0, minPiercingDamages);
  }

  damages = floorMultiplication(damages, battleValues.skillDamageCoeff);
  damages = floorMultiplication(
    damages,
    battleValues.skillDamageResistanceCoeff
  );

  damages = floorMultiplication(damages, battleValues.rankBonusCoeff);
  damages = Math.max(0, damages + Math.floor(battleValues.defensePercent));
  damages += Math.min(
    300,
    floorMultiplication(damages, battleValues.damageBonusCoeff)
  );
  damages = floorMultiplication(damages, battleValues.empireMalusCoeff);

  return damages;
}

function computePolymorphPoint(attacker, victim, polymorphPowerTable) {
  attacker.statAttackValue = 0;

  attacker.polymorphDex = attacker.dex;
  victim.polymorphDex = victim.dex;

  attacker.minAttackValuePolymorph = 0;
  attacker.maxAttackValuePolymorph = 0;

  if (isPC(attacker) && isPolymorph(attacker) && polymorphPowerTable) {
    var polymorphPowerPct =
      getPolymorphPower(attacker.polymorphPoint, polymorphPowerTable) / 100;
    var polymorphMonster = createMonster(attacker.polymorphMonster);

    var polymorphStr = floorMultiplication(
      polymorphPowerPct,
      polymorphMonster.str
    );

    attacker.polymorphDex += floorMultiplication(
      polymorphPowerPct,
      polymorphMonster.dex
    );

    attacker.minAttackValuePolymorph = floorMultiplication(
      polymorphPowerPct,
      polymorphMonster.minAttackValue
    );
    attacker.maxAttackValuePolymorph = floorMultiplication(
      polymorphPowerPct,
      polymorphMonster.maxAttackValue
    );

    if (!attacker.weapon) {
      attacker.maxAttackValuePolymorph += 1;
    }

    attacker.attackValue = 0;

    if (isMagicClass(attacker)) {
      attacker.statAttackValue = 2 * (polymorphStr + attacker.int);
    } else {
      attacker.statAttackValue = 2 * (polymorphStr + attacker.str);
    }
  } else {
    attacker.statAttackValue = calcStatAttackValue(attacker);
  }
}

function computeHorse(attacker) {
  attacker.horseAttackValue = 0;

  if (isPC(attacker) && isRiding(attacker)) {
    var horseConstant = 30;

    if (attacker.class === "weaponary") {
      horseConstant = 60;
    }

    attacker.horseAttackValue = floorMultiplication(
      2 * attacker.level + attacker.statAttackValue,
      attacker.horsePoint / horseConstant
    );
  }
}

function getRankBonus(attacker) {
  if (attacker.lowRank !== "on") {
    return 0;
  }

  switch (attacker.playerRank) {
    case "aggressive":
      return 1;
    case "fraudulent":
      return 2;
    case "malicious":
      return 3;
    case "cruel":
      return 5;
  }
}

function skillChanceReduction(value) {
  if (value <= 9) {
    return Math.floor(value / 2);
  }
  return 5 + Math.floor((value - 10) / 4);
}

function magicResistanceToCoeff(magicResistance) {
  if (magicResistance) {
    return 2000 / (6 * magicResistance + 1000) - 1;
  }
  return 1;
}

function createPhysicalBattleValues(
  attacker,
  attackerWeapon,
  victim,
  mapping,
  polymorphPowerTable,
  marriageTable,
  skillPowerTable
) {
  var missPercentage = 0;
  var attackValuePercent = 0;
  var attackMeleeMagic = 0;
  var attackValueMarriage = 0;
  var monsterResistanceMarriage = 0;
  var monsterResistance = 0;
  var typeBonus = 0;
  var raceBonus = 0;
  var raceResistance = 0;
  var stoneBonus = 0;
  var monsterBonus = 0;
  var elementBonus = [0, 0, 0, 0, 0, 0]; // fire, ice, lightning, earth, darkness, wind, order doesn't matter
  var defenseMarriage = 0;
  var damageMultiplier = 1;
  var magicResistance = 0;
  var weaponDefense = 0;
  var blessingBonus = 0;
  var criticalHitPercentage = attacker.criticalHit;
  var criticalHitPercentageMarriage = 0;
  var piercingHitPercentage = attacker.piercingHit;
  var piercingHitPercentageMarriage = 0;
  var extraPiercingHitPercentage = Math.max(0, piercingHitPercentage - 100);
  var averageDamage = 0;
  var averageDamageResistance = 0;
  var skillDamageResistance = 0;
  var rankBonus = 0;
  var defensePercent = 0;
  var damageBonus = 0;
  var empireMalus = 0;

  computePolymorphPoint(attacker, victim, polymorphPowerTable);
  computeHorse(attacker);

  if (isPC(attacker)) {
    attackValuePercent = attacker.attackValuePercent;
    attackMeleeMagic = attacker.attackMeleeMagic;

    var weaponType = attackerWeapon[1];

    var weaponDefenseName = mapping.defenseWeapon[weaponType];
    var weaponDefenseBreakName = mapping.breakWeapon[weaponType];

    if (victim.hasOwnProperty(weaponDefenseName)) {
      weaponDefense = victim[weaponDefenseName];
    }

    if (isPC(victim)) {
      if (weaponType === 2 && !isPolymorph(attacker)) {
        missPercentage = victim.arrowBlock;
      } else {
        missPercentage = victim.meleeBlock;
      }

      missPercentage +=
        victim.meleeArrowBlock -
        (missPercentage * victim.meleeArrowBlock) / 100;

      typeBonus = Math.max(
        0,
        Math.max(1, attacker.humanBonus) - victim.humanResistance
      );
      raceBonus = attacker[mapping.raceBonus[victim.race]];
      raceResistance = victim[mapping.raceResistance[attacker.race]];

      for (var index = 0; index <= 5; index++) {
        elementBonus[index] =
          Math.max(
            0,
            attacker[mapping.elementBonus[index]] -
              victim[mapping.elementResistance[index]]
          ) / 1000;
      }

      if (attacker.hasOwnProperty(weaponDefenseBreakName)) {
        weaponDefense -= attacker[weaponDefenseBreakName];
      }

      blessingBonus = calcBlessingBonus(skillPowerTable, victim);
      averageDamageResistance = victim.averageDamageResistance;
    } else {
      if (attacker.loveNecklace === "on") {
        attackValueMarriage = getMarriageBonusValue(
          attacker,
          marriageTable,
          "loveNecklace"
        );
      }

      if (attacker.loveEarrings === "on") {
        criticalHitPercentageMarriage = getMarriageBonusValue(
          attacker,
          marriageTable,
          "loveEarrings"
        );
      }

      if (attacker.harmonyEarrings === "on") {
        piercingHitPercentageMarriage = getMarriageBonusValue(
          attacker,
          marriageTable,
          "harmonyEarrings"
        );
      }

      for (var index = 0; index <= 5; index++) {
        var elementBonusName = mapping.elementBonus[index];
        var elementResistanceName = mapping.elementResistance[index];

        if (attacker[elementBonusName] && victim[elementBonusName]) {
          elementBonus[index] =
            (attacker[elementBonusName] - victim[elementResistanceName]) / 200;
        } else {
          elementBonus[index] = attacker[elementBonusName] / 2000;
        }
      }

      var victimType = victim.type;

      if (victimType !== -1) {
        typeBonus = attacker[mapping.typeFlag[victimType]];
      }

      monsterBonus = attacker.monsterBonus;

      if (isStone(victim)) {
        stoneBonus = attacker.stoneBonus;
      }

      if (isBoss(victim)) {
        averageDamage += attacker.bossDamage;
      }
    }

    averageDamage += attacker.averageDamage;
    rankBonus = getRankBonus(attacker);
    damageBonus = attacker.damageBonus;

    if (attacker.empireMalus === "on") {
      empireMalus = 10;
    }
  } else {
    if (isPC(victim)) {
      if (victim.harmonyBracelet === "on") {
        monsterResistanceMarriage = getMarriageBonusValue(
          victim,
          marriageTable,
          "harmonyBracelet"
        );
      }

      if (victim.harmonyNecklace === "on") {
        defenseMarriage = getMarriageBonusValue(
          victim,
          marriageTable,
          "harmonyNecklace"
        );
      }

      monsterResistance = victim.monsterResistance;

      for (var index = 0; index <= 5; index++) {
        var elementBonusName = mapping.elementBonus[index];
        var elementResistanceName = mapping.elementResistance[index];

        if (attacker[elementBonusName]) {
          elementBonus[index] =
            (attacker[elementBonusName] - victim[elementResistanceName]) / 125;
        }
      }

      if (attacker.attack == 0) {
        missPercentage = victim.meleeBlock;
        averageDamageResistance = victim.averageDamageResistance;
        blessingBonus = calcBlessingBonus(skillPowerTable, victim);
      } else if (attacker.attack == 1) {
        missPercentage = victim.arrowBlock;
        weaponDefense = victim.arrowDefense;
        averageDamageResistance = victim.averageDamageResistance;
        blessingBonus = calcBlessingBonus(skillPowerTable, victim);
      } else {
        missPercentage = victim.arrowBlock;
        skillDamageResistance = victim.skillDamageResistance;
        magicResistance = victim.magicResistance;
      }

      missPercentage +=
        victim.meleeArrowBlock -
        (missPercentage * victim.meleeArrowBlock) / 100;
    }

    typeBonus = 1;
    damageMultiplier = attacker.damageMultiplier;
  }

  if (isPC(victim)) {
    if (victim.biologist70 === "on") {
      victim.defense = floorMultiplication(victim.defense, 1.1);
    }
    criticalHitPercentage = Math.max(
      0,
      criticalHitPercentage - victim.criticalHitResistance
    );
    piercingHitPercentage = Math.max(
      0,
      piercingHitPercentage - victim.piercingHitResistance
    );

    if (isMagicClass(victim)) {
      defensePercent = (-2 * victim.magicDefense * victim.defensePercent) / 100;
    } else {
      defensePercent = (-2 * victim.defense * victim.defensePercent) / 100;
    }
  }

  missPercentage = Math.min(100, missPercentage);

  var battleValues = {
    missPercentage: missPercentage,
    adjustCoeff: 0,
    attackValueCoeff:
      1 + (attackValuePercent + Math.min(100, attackMeleeMagic)) / 100,
    attackValueMarriage: attackValueMarriage,
    monsterResistanceMarriageCoeff: 1 - monsterResistanceMarriage / 100,
    monsterResistanceCoeff: 1 - monsterResistance / 100,
    typeBonusCoeff: 1 + typeBonus / 100,
    raceBonusCoeff: raceBonus / 100,
    raceResistanceCoeff: raceResistance / 100,
    monsterBonusCoeff: 1 + monsterBonus / 100,
    stoneBonusCoeff: 1 + stoneBonus / 100,
    elementBonusCoeff: elementBonus,
    damageMultiplier: damageMultiplier,
    defense: victim.defense,
    defenseMarriage: defenseMarriage,
    magicResistanceCoeff: magicResistanceToCoeff(magicResistance),
    weaponDefenseCoeff: 1 - weaponDefense / 100,
    blessingBonusCoeff: 1 - blessingBonus / 100,
    extraPiercingHitCoeff: 1 + extraPiercingHitPercentage / 200,
    averageDamageCoeff: 1 + averageDamage / 100,
    averageDamageResistanceCoeff:
      1 - Math.min(99, averageDamageResistance) / 100,
    skillDamageResistanceCoeff: 1 - Math.min(99, skillDamageResistance) / 100,
    rankBonusCoeff: 1 + rankBonus / 100,
    defensePercent: defensePercent,
    damageBonusCoeff: damageBonus / 100,
    empireMalusCoeff: 1 - empireMalus / 100,
  };

  criticalHitPercentage = Math.min(
    criticalHitPercentage + criticalHitPercentageMarriage,
    100
  );
  piercingHitPercentage = Math.min(
    piercingHitPercentage + piercingHitPercentageMarriage,
    100
  );

  battleValues.damagesTypeCombinaison = [
    {
      criticalHit: false,
      piercingHit: false,
      weight:
        (100 - criticalHitPercentage) *
        (100 - piercingHitPercentage) *
        (100 - missPercentage),
      name: "Coup classique",
    },
    {
      criticalHit: true,
      piercingHit: false,
      weight:
        criticalHitPercentage *
        (100 - piercingHitPercentage) *
        (100 - missPercentage),
      name: "Coup critique",
    },
    {
      criticalHit: false,
      piercingHit: true,
      weight:
        (100 - criticalHitPercentage) *
        piercingHitPercentage *
        (100 - missPercentage),
      name: "Coup perçant",
    },
    {
      criticalHit: true,
      piercingHit: true,
      weight:
        criticalHitPercentage * piercingHitPercentage * (100 - missPercentage),
      name: "Coup critique + coup perçant",
    },
  ];

  return battleValues;
}

function createSkillBattleValues(
  attacker,
  attackerWeapon,
  victim,
  mapping,
  marriageTable,
  skillId,
  magicSkill
) {
  var adjustCoeff = 0;
  var attackValuePercent = 0;
  var attackMeleeMagic = 0;
  var attackValueMarriage = 0;
  var monsterResistanceMarriage = 0;
  var monsterResistance = 0;
  var typeBonus = 0;
  var raceBonus = 0;
  var raceResistance = 0;
  var stoneBonus = 0;
  var monsterBonus = 0;
  var elementBonus = [0, 0, 0, 0, 0, 0]; // fire, ice, lightning, earth, darkness, wind, order doesn't matter
  var damageMultiplier = 1;
  var defense = victim.defense;
  var magicResistance = 0;
  var weaponDefense = 0;
  var specificSkillBonus = 0;
  var criticalHitPercentage = attacker.criticalHit;
  var piercingHitPercentage = attacker.piercingHit;
  var skillDamage = 0;
  var skillDamageResistance = 0;
  var rankBonus = 0;
  var defensePercent = 0;
  var damageBonus = 0;
  var empireMalus = 0;

  computePolymorphPoint(attacker, victim);
  computeHorse(attacker);

  if (isPC(attacker)) {
    attackValuePercent = attacker.attackValuePercent;
    attackMeleeMagic = attacker.attackMeleeMagic;

    var weaponType = attackerWeapon[1];

    var weaponDefenseName = mapping.defenseWeapon[weaponType];
    var weaponDefenseBreakName = mapping.breakWeapon[weaponType];

    if (victim.hasOwnProperty(weaponDefenseName)) {
      weaponDefense = victim[weaponDefenseName];
    }

    if (attacker.class === "archery") {
      defense = 0;
    }

    if (isPC(victim)) {
      typeBonus = Math.max(
        0,
        Math.max(1, attacker.humanBonus) - victim.humanResistance
      );
      raceBonus = attacker[mapping.raceBonus[victim.race]];
      raceResistance = victim[mapping.raceResistance[attacker.race]];

      for (var index = 0; index <= 5; index++) {
        elementBonus[index] =
          Math.max(
            0,
            attacker[mapping.elementBonus[index]] -
              victim[mapping.elementResistance[index]]
          ) / 1000;
      }

      if (attacker.hasOwnProperty(weaponDefenseBreakName)) {
        weaponDefense -= attacker[weaponDefenseBreakName];
      }

      criticalHitPercentage = 0;
    } else {
      if (attacker.loveNecklace === "on") {
        attackValueMarriage = getMarriageBonusValue(
          attacker,
          marriageTable,
          "loveNecklace"
        );
      }

      if (attacker.loveEarrings === "on") {
        criticalHitPercentage += getMarriageBonusValue(
          attacker,
          marriageTable,
          "loveEarrings"
        );
      }

      if (attacker.harmonyEarrings === "on") {
        piercingHitPercentage += getMarriageBonusValue(
          attacker,
          marriageTable,
          "harmonyEarrings"
        );
      }

      for (var index = 0; index <= 5; index++) {
        var elementBonusName = mapping.elementBonus[index];
        var elementResistanceName = mapping.elementResistance[index];

        if (attacker[elementBonusName] && victim[elementBonusName]) {
          elementBonus[index] =
            (attacker[elementBonusName] - victim[elementResistanceName]) / 200;
        } else {
          elementBonus[index] = attacker[elementBonusName] / 2000;
        }
      }

      var victimType = victim.type;

      if (victimType !== -1) {
        typeBonus = attacker[mapping.typeFlag[victimType]];
      }

      monsterBonus = attacker.monsterBonus;

      if (isStone(victim)) {
        stoneBonus = attacker.stoneBonus;
      }

      if (isBoss(victim)) {
        skillDamage += attacker.skillBossDamage;
      }
    }

    specificSkillBonus = attacker["skillBonus" + skillId];
    skillDamage += attacker.skillDamage;
    rankBonus = getRankBonus(attacker);
    damageBonus = attacker.damageBonus;

    if (attacker.empireMalus === "on") {
      empireMalus = 10;
    }
  } else {
    if (isPC(victim)) {
      if (victim.harmonyBracelet === "on") {
        monsterResistanceMarriage = getMarriageBonusValue(
          victim,
          marriageTable,
          "harmonyBracelet"
        );
      }
      monsterResistance = victim.monsterResistance;

      for (var index = 0; index <= 5; index++) {
        var elementBonusName = mapping.elementBonus[index];
        var elementResistanceName = mapping.elementResistance[index];

        if (attacker[elementBonusName]) {
          elementBonus[index] =
            (attacker[elementBonusName] - victim[elementResistanceName]) / 125;
        }
      }
    }

    typeBonus = 1;
    damageMultiplier = attacker.damageMultiplier;
  }

  criticalHitPercentage = skillChanceReduction(criticalHitPercentage);
  piercingHitPercentage = skillChanceReduction(piercingHitPercentage);

  if (isPC(victim)) {
    criticalHitPercentage = Math.max(
      0,
      criticalHitPercentage - victim.criticalHitResistance
    );
    piercingHitPercentage = Math.max(
      0,
      piercingHitPercentage - victim.piercingHitResistance
    );
    skillDamageResistance = victim.skillDamageResistance;

    if (isMagicClass(victim)) {
      defensePercent = (-2 * victim.magicDefense * victim.defensePercent) / 100;
    } else {
      defensePercent = (-2 * victim.defense * victim.defensePercent) / 100;
    }
  }

  if (magicSkill) {
    adjustCoeff = 0.5;
    attackValuePercent = attacker.attackMagic;
    attackValueMarriage = 0;
    defense = 0;
    magicResistance = victim.magicResistance;
    weaponDefense = 0;
  }

  var battleValues = {
    weaponBonusCoeff: 1,
    adjustCoeff: adjustCoeff,
    attackValueCoeff:
      1 + (attackValuePercent + Math.min(100, attackMeleeMagic)) / 100,
    attackValueMarriage: attackValueMarriage,
    monsterResistanceMarriageCoeff: 1 - monsterResistanceMarriage / 100,
    monsterResistanceCoeff: 1 - monsterResistance / 100,
    typeBonusCoeff: 1 + typeBonus / 100,
    raceBonusCoeff: raceBonus / 100,
    raceResistanceCoeff: raceResistance / 100,
    monsterBonusCoeff: 1 + monsterBonus / 100,
    stoneBonusCoeff: 1 + stoneBonus / 100,
    elementBonusCoeff: elementBonus,
    damageMultiplier: damageMultiplier,
    defense: defense,
    piercingHitDefense: victim.defense,
    magicResistanceCoeff: magicResistanceToCoeff(magicResistance),
    weaponDefenseCoeff: 1 - weaponDefense / 100,
    specificSkillBonusCoeff: 1 + specificSkillBonus / 100,
    skillDamageCoeff: 1 + skillDamage / 100,
    skillDamageResistanceCoeff: 1 - Math.min(99, skillDamageResistance) / 100,
    rankBonusCoeff: 1 + rankBonus / 100,
    defensePercent: defensePercent,
    damageBonusCoeff: damageBonus / 100,
    empireMalusCoeff: 1 - empireMalus / 100,
  };

  criticalHitPercentage = Math.min(criticalHitPercentage, 100);
  piercingHitPercentage = Math.min(piercingHitPercentage, 100);

  battleValues.damagesTypeCombinaison = [
    {
      criticalHit: false,
      piercingHit: false,
      weight: (100 - criticalHitPercentage) * (100 - piercingHitPercentage),
      name: "Coup classique",
    },
    {
      criticalHit: true,
      piercingHit: false,
      weight: criticalHitPercentage * (100 - piercingHitPercentage),
      name: "Coup critique",
    },
    {
      criticalHit: false,
      piercingHit: true,
      weight: (100 - criticalHitPercentage) * piercingHitPercentage,
      name: "Coup perçant",
    },
    {
      criticalHit: true,
      piercingHit: true,
      weight: criticalHitPercentage * piercingHitPercentage,
      name: "Coup critique + coup perçant",
    },
  ];

  return battleValues;
}

function updateBattleValues(battleValues, skillInfo, attackerWeapon) {
  var weaponBonus = 0;
  var skillWard = 0;
  var skillBonus = 0;

  if (skillInfo.hasOwnProperty("weaponBonus")) {
    var [weaponType, weaponBonusValue] = skillInfo.weaponBonus;

    if (weaponType === attackerWeapon[1]) {
      weaponBonus = weaponBonusValue;
    }
  }

  if (skillInfo.skillBonus) {
    skillBonus = skillInfo.skillBonus;
  }

  if (skillInfo.skillWard) {
    skillWard = skillInfo.skillWard;
  }

  battleValues.weaponBonusCoeff = 1 + weaponBonus / 100;
  battleValues.skillWardCoeff = 1 - skillWard / 100;
  battleValues.skillBonusCoeff = 1 + skillBonus / 100;
}

function calcPhysicalDamages(
  attacker,
  attackerWeapon,
  victim,
  tableResult,
  mapping,
  constants
) {
  var battleValues = createPhysicalBattleValues(
    attacker,
    attackerWeapon,
    victim,
    mapping,
    constants.polymorphPowerTable,
    constants.marriageTable,
    constants.skillPowerTable
  );

  var sumDamages = 0;
  var minMaxDamages = { min: Infinity, max: 0 };
  clearTableResult(tableResult);

  var attackFactor = calcAttackFactor(attacker, victim);
  var mainAttackValue = calcMainAttackValue(attacker, attackerWeapon);
  var [
    minAttackValue,
    maxAttackValue,
    attackValueOther,
    minInterval,
    totalCardinal,
  ] = calcSecondaryAttackValue(attacker, attackerWeapon);

  totalCardinal *= 100;

  if (battleValues.missPercentage) {
    addRowToTableResult(tableResult, "Miss");
    addToTableResult(tableResult, { 0: battleValues.missPercentage / 100 });
  }

  var lastWeightsLimit = maxAttackValue - minInterval + 1;
  var firstWeightLimit = minAttackValue + minInterval - 1;

  for (var damagesType of battleValues.damagesTypeCombinaison) {
    if (!damagesType.weight) {
      continue;
    }

    var damagesWeighted = {};
    addRowToTableResult(tableResult, damagesType.name);

    for (
      var attackValue = minAttackValue;
      attackValue <= maxAttackValue;
      attackValue++
    ) {
      var weight;

      if (attackValue > lastWeightsLimit) {
        weight = maxAttackValue - attackValue + 1;
      } else if (attackValue < firstWeightLimit) {
        weight = attackValue - minAttackValue + 1;
      } else {
        weight = minInterval;
      }

      var secondaryAttackValue = 2 * attackValue + attackValueOther;
      var rawDamages =
        mainAttackValue +
        floorMultiplication(attackFactor, secondaryAttackValue);
      var damagesWithPrimaryBonuses = calcDamageWithPrimaryBonuses(
        rawDamages,
        battleValues
      );

      damagesWithPrimaryBonuses -=
        battleValues.defense + battleValues.defenseMarriage;

      if (damagesWithPrimaryBonuses <= 2) {
        for (var damages = 1; damages <= 5; damages++) {
          var finalDamages = calcDamageWithSecondaryBonuses(
            damages,
            battleValues,
            damagesType,
            damagesWithPrimaryBonuses
          );

          addKeyValue(
            damagesWeighted,
            finalDamages,
            (weight * damagesType.weight) / (5 * totalCardinal)
          );
          sumDamages += (finalDamages * weight * damagesType.weight) / 5;
        }
      } else {
        var finalDamages = calcDamageWithSecondaryBonuses(
          damagesWithPrimaryBonuses,
          battleValues,
          damagesType,
          damagesWithPrimaryBonuses
        );

        addKeyValue(
          damagesWeighted,
          finalDamages,
          (weight * damagesType.weight) / totalCardinal
        );
        sumDamages += finalDamages * weight * damagesType.weight;
      }
    }

    addToTableResult(tableResult, damagesWeighted, minMaxDamages);
  }

  if (minMaxDamages.min === Infinity) {
    minMaxDamages.min = 0;
  }

  return [sumDamages / totalCardinal, minMaxDamages];
}

function calcBlessingBonus(skillPowerTable, victim) {
  if (victim.blessingActivation !== "on") {
    return 0;
  }

  var int = victim.intBlessing;
  var dex = victim.dexBlessing;
  var skillPower = getSkillPower(victim["skillBlessing"], skillPowerTable);

  if (!skillPower) {
    return 0;
  }

  var blessingBonus = floorMultiplication(
    ((int * 0.3 + 5) * (2 * skillPower + 0.5) + (0.3 * dex)) / (skillPower + 2.3),
    1
  );

  if (victim.class === "dragon" && victim.blessingOnself === "on") {
    blessingBonus = floorMultiplication(blessingBonus, 1.1);
  }

  return blessingBonus;
}

function getSkillFormula(
  skillPowerTable,
  skillId,
  attacker,
  attackFactor,
  victim
) {
  var skillFormula;
  var skillInfo = {};

  var attackerClass = attacker.class;
  var lv = attacker.level;
  var vit = attacker.vit;
  var str = attacker.str;
  var int = attacker.int;
  var dex = attacker.dex;

  var skillPower = getSkillPower(
    attacker["attackSkill" + skillId],
    skillPowerTable
  );

  var improvedBySkillBonus = false;

  if (attackerClass === "body") {
    switch (skillId) {
      // Triple lacération
      case 1:
        skillFormula = function (atk) {
          return floorMultiplication(
            1.1 * atk + (0.5 * atk + 1.5 * str) * skillPower,
            1
          );
        };
        break;
      // Moulinet à l'épée
      case 2:
        skillFormula = function (atk) {
          return floorMultiplication(
            3 * atk + (0.8 * atk + 5 * str + 3 * dex + vit) * skillPower,
            1
          );
        };
        improvedBySkillBonus = true;
        break;
      // Accélération
      case 5:
        skillFormula = function (atk) {
          return floorMultiplication(
            2 * atk + (atk + dex * 3 + str * 7 + vit) * skillPower,
            1
          );
        };
        break;
      // Volonté de vivre
      // case 6:
      //   skillFormula = function (atk) {
      //     return floorMultiplication(
      //       (3 * atk + (atk + 1.5 * str) * k) *
      //         1.07(3 * atk + (atk + 1.5 * str) * skillPower) *
      //         1.07,
      //       1
      //     );
      //   };
      //   break;
    }
  } else if (attackerClass === "mental") {
    switch (skillId) {
      // Attaque de l'esprit
      case 1:
        skillFormula = function (atk) {
          return floorMultiplication(
            2.3 * atk + (4 * atk + 4 * str + vit) * skillPower,
            1
          );
        };
        improvedBySkillBonus = true;
        break;
      // Attaque de la paume
      case 2:
        skillFormula = function (atk) {
          return floorMultiplication(
            2.3 * atk + (3 * atk + 4 * str + 3 * vit) * skillPower,
            1
          );
        };
        break;
      // Charge
      case 3:
        skillFormula = function (atk) {
          return floorMultiplication(
            2 * atk + (2 * atk + 2 * dex + 2 * vit + 4 * str) * skillPower,
            1
          );
        };
        break;
      // Coup d'épée
      case 5:
        skillFormula = function (atk) {
          return floorMultiplication(
            2 * atk + (atk + 3 * dex + 5 * str + vit) * skillPower,
            1
          );
        };
        break;
      // Orbe de l'épée
      // case 6:
      //   skillFormula = function (atk) {
      //     return floorMultiplication(
      //       (2 * atk + (2 * atk + 2 * dex + 2 * vit + 4 * str) * skillPower) *
      //         1.1,
      //       1
      //     );
      //   };
      //   break;
    }
  } else if (attackerClass === "blade_fight") {
    switch (skillId) {
      // Dague filante
      case 3:
        skillFormula = function (atk) {
          return floorMultiplication(
            2 * atk + (0.5 * atk + 9 * dex + 7 * str) * skillPower,
            1
          );
        };
        break;
      // Brume empoisonnée
      case 5:
        skillFormula = function (atk) {
          return floorMultiplication(
            2 * lv + (atk + 3 * str + 18 * dex) * skillPower,
            1
          );
        };
        break;
      // Poison insidieux
      case 6:
        skillFormula = function (atk) {
          return floorMultiplication(
            (2 * lv + (atk + 3 * str + 18 * dex) * skillPower) * 1.1,
            1
          );
        };
        break;
    }
  } else if (attackerClass === "archery") {
    switch (skillId) {
      // Tir à répétition
      // case 1:
      //   skillFormula = function (atk) {
      //     return floorMultiplication(
      //       atk +
      //         0.2 * atk * Math.floor(2 + 6 * skillPower) +
      //         (0.8 * atk + 8 * dex * attackFactor + 2 * int) * skillPower,
      //       1
      //     );
      //   };
      //   break;
      // Pluie de flèches
      case 2:
        skillFormula = function (atk) {
          return floorMultiplication(
            atk + (1.7 * atk + 5 * dex + str) * skillPower,
            1
          );
        };
        break;
    }
  } else if (attackerClass === "weaponary") {
    switch (skillId) {
      // Toucher brûlant
      case 1:
        skillFormula = function (atk) {
          return floorMultiplication(
            atk +
              2 * lv +
              2 * int +
              (2 * atk + 4 * str + 14 * int) * skillPower,
            1
          );
        };
        improvedBySkillBonus = true;
        break;
      // Tourbillon du dragon
      case 2:
        skillFormula = function (atk) {
          return floorMultiplication(
            1.1 * atk +
              2 * lv +
              2 * int +
              (1.5 * atk + str + 12 * int) * skillPower,
            1
          );
        };
        break;
    }
  } else if (attackerClass === "black_magic") {
    switch (skillId) {
      // Orbe des ténèbres
      case 6:
        skillFormula = function (mav) {
          return floorMultiplication(
            120 +
              6 * lv +
              (5 * vit + 5 * dex + 29 * int + 9 * mav) *
                attackFactor *
                skillPower,
            1
          );
        };
        break;
    }
  } else if (attackerClass === "dragon") {
    switch (skillId) {
      // Talisman volant
      case 1:
        skillFormula = function (mav) {
          return floorMultiplication(
            70 +
              5 * lv +
              (18 * int + 7 * str + 5 * mav + 50) * attackFactor * skillPower,
            1
          );
        };
        skillInfo.weaponBonus = [4, 10];
        break;
      // Dragon chassant
      case 2:
        skillFormula = function (mav) {
          return floorMultiplication(
            60 +
              5 * lv +
              (16 * int + 6 * dex + 6 * mav + 120) * attackFactor * skillPower,
            1
          );
        };
        skillInfo.weaponBonus = [4, 10];
        improvedBySkillBonus = true;
        break;
      // Rugissement du dragon
      case 3:
        skillFormula = function (mav) {
          return floorMultiplication(
            70 +
              3 * lv +
              (20 * int + 3 * str + 10 * mav + 100) * attackFactor * skillPower,
            1
          );
        };
        skillInfo.weaponBonus = [4, 10];
        break;
    }
  } else if (attackerClass === "heal") {
    switch (skillId) {
      // Jet de foudre
      case 1:
        skillFormula = function (mav) {
          return floorMultiplication(
            60 +
              5 * lv +
              (8 * int + 2 * dex + 8 * mav + 10 * int) *
                attackFactor *
                skillPower,
            1
          );
        };
        skillInfo.weaponBonus = [6, 10];
        break;
      // Invocation de foudre
      case 2:
        skillFormula = function (mav) {
          return floorMultiplication(
            40 +
              4 * lv +
              (13 * int + 2 * str + 10 * mav + 10.5 * int) *
                attackFactor *
                skillPower,
            1
          );
        };
        skillInfo.weaponBonus = [6, 10];
        improvedBySkillBonus = true;
        break;
      // Griffe de foudre
      case 3:
        skillFormula = function (mav) {
          return floorMultiplication(
            50 +
              5 * lv +
              (8 * int + 2 * str + 8 * mav + 400.5) * attackFactor * skillPower,
            1
          );
        };
        break;
    }
  } else if (attackerClass === "lycan") {
    switch (skillId) {
      // Déchiqueter
      // case 1:
      //   skillFormula = function (atk) {
      //     return floorMultiplication(
      //       1.1 * atk + (0.3 * atk + 1.5 * str) * skillPower,
      //       1
      //     );
      //   };
      //   skillInfo.weaponBonus = [5, 54];
      //   break;
      // Souffle de loup
      case 2:
        skillFormula = function (atk) {
          return floorMultiplication(
            2 * atk + (atk + 3 * dex + 5 * str + vit) * skillPower,
            1
          );
        };
        skillInfo.weaponBonus = [5, 35];
        improvedBySkillBonus = true;
        break;
      // Bond de loup
      case 3:
        skillFormula = function (atk) {
          return floorMultiplication(
            atk + (1.6 * atk + 200 + 7 * dex + 7 * str) * skillPower,
            1
          );
        };
        skillInfo.weaponBonus = [5, 35];
        break;
      // Griffe de loup
      case 4:
        skillFormula = function (atk) {
          return floorMultiplication(
            3 * atk + (0.8 * atk + 6 * str + 2 * dex + vit) * skillPower,
            1
          );
        };
        break;
    }
  }

  if (improvedBySkillBonus) {
    skillInfo.skillBonus =
      16 * getSkillPower(attacker.skillBonus, skillPowerTable);

    var skillWardChoice = victim.skillWardChoice;

    if (skillWardChoice && skillWardChoice === attackerClass) {
      skillInfo.skillWard =
        24 * getSkillPower(victim.skillWard, skillPowerTable);
    }
  }

  return [skillFormula, skillInfo];
}

function calcPhysicalSkillDamages(
  attacker,
  attackerWeapon,
  victim,
  tableResult,
  mapping,
  constants,
  skillId
) {
  var battleValues = createSkillBattleValues(
    attacker,
    attackerWeapon,
    victim,
    mapping,
    constants.marriageTable,
    skillId
  );

  var sumDamages = 0;
  var minMaxDamages = { min: Infinity, max: 0 };
  clearTableResult(tableResult);

  var attackFactor = calcAttackFactor(attacker, victim);
  var mainAttackValue = calcMainAttackValue(attacker, attackerWeapon);
  var [
    minAttackValue,
    maxAttackValue,
    attackValueOther,
    minInterval,
    totalCardinal,
  ] = calcSecondaryAttackValue(attacker, attackerWeapon);

  var lastWeightsLimit = maxAttackValue - minInterval + 1;
  var firstWeightLimit = minAttackValue + minInterval - 1;

  var [skillFormula, skillInfo] = getSkillFormula(
    constants.skillPowerTable,
    skillId,
    attacker,
    attackFactor,
    victim
  );

  updateBattleValues(battleValues, skillInfo, attackerWeapon);

  for (var damagesType of battleValues.damagesTypeCombinaison) {
    if (!damagesType.weight) {
      continue;
    }

    var damagesWeighted = {};
    addRowToTableResult(tableResult, damagesType.name);

    for (
      var attackValue = minAttackValue;
      attackValue <= maxAttackValue;
      attackValue++
    ) {
      var weight;

      if (attackValue > lastWeightsLimit) {
        weight = maxAttackValue - attackValue + 1;
      } else if (attackValue < firstWeightLimit) {
        weight = attackValue - minAttackValue + 1;
      } else {
        weight = minInterval;
      }

      var secondaryAttackValue = 2 * attackValue + attackValueOther;
      var rawDamages =
        mainAttackValue +
        floorMultiplication(attackFactor, secondaryAttackValue);
      var damagesWithPrimaryBonuses = calcDamageWithPrimaryBonuses(
        rawDamages,
        battleValues
      );

      if (damagesWithPrimaryBonuses <= 2) {
        for (var damages = 1; damages <= 5; damages++) {
          var damagesWithFormula = skillFormula(damages);

          damagesWithFormula = floorMultiplication(
            damagesWithFormula,
            battleValues.weaponBonusCoeff
          );

          var finalDamages = calcSkillDamageWithSecondaryBonuses(
            damagesWithFormula,
            battleValues,
            damagesType,
            damagesWithPrimaryBonuses
          );

          addKeyValue(
            damagesWeighted,
            finalDamages,
            (weight * damagesType.weight) / (5 * totalCardinal)
          );
          sumDamages += (finalDamages * weight * damagesType.weight) / 5;
        }
      } else {
        var damagesWithFormula = skillFormula(damagesWithPrimaryBonuses);

        damagesWithFormula = floorMultiplication(
          damagesWithFormula,
          battleValues.weaponBonusCoeff
        );

        var finalDamages = calcSkillDamageWithSecondaryBonuses(
          damagesWithFormula,
          battleValues,
          damagesType,
          damagesWithPrimaryBonuses
        );

        addKeyValue(
          damagesWeighted,
          finalDamages,
          (weight * damagesType.weight) / totalCardinal
        );
        sumDamages += finalDamages * weight * damagesType.weight;
      }
    }

    addToTableResult(tableResult, damagesWeighted, minMaxDamages);
  }

  if (minMaxDamages.min === Infinity) {
    minMaxDamages.min = 0;
  }

  return [sumDamages / totalCardinal, minMaxDamages];
}

function calcMagicSkillDamages(
  attacker,
  attackerWeapon,
  victim,
  tableResult,
  mapping,
  constants,
  skillId
) {
  var battleValues = createSkillBattleValues(
    attacker,
    attackerWeapon,
    victim,
    mapping,
    constants.marriageTable,
    skillId,
    true
  );

  var sumDamages = 0;
  var minMaxDamages = { min: Infinity, max: 0 };
  clearTableResult(tableResult);

  var attackFactor = calcAttackFactor(attacker, victim);
  var [minMagicAttackValue, maxMagicAttackValue, minInterval, totalCardinal] =
    calcMagicAttackValue(attacker, attackerWeapon);

  var lastWeightsLimit = maxMagicAttackValue - minInterval + 1;
  var firstWeightLimit = minMagicAttackValue + minInterval - 1;

  var [skillFormula, skillInfo] = getSkillFormula(
    constants.skillPowerTable,
    skillId,
    attacker,
    attackFactor,
    victim
  );

  updateBattleValues(battleValues, skillInfo, attackerWeapon);

  for (var damagesType of battleValues.damagesTypeCombinaison) {
    if (!damagesType.weight) {
      continue;
    }

    var damagesWeighted = {};
    addRowToTableResult(tableResult, damagesType.name);

    for (
      var magicAttackValue = minMagicAttackValue;
      magicAttackValue <= maxMagicAttackValue;
      magicAttackValue++
    ) {
      var weight;

      if (magicAttackValue > lastWeightsLimit) {
        weight = maxMagicAttackValue - magicAttackValue + 1;
      } else if (magicAttackValue < firstWeightLimit) {
        weight = magicAttackValue - minMagicAttackValue + 1;
      } else {
        weight = minInterval;
      }

      var rawDamages = skillFormula(magicAttackValue);

      rawDamages = floorMultiplication(
        rawDamages,
        battleValues.weaponBonusCoeff
      );

      var damagesWithPrimaryBonuses = calcDamageWithPrimaryBonuses(
        rawDamages,
        battleValues
      );

      if (damagesWithPrimaryBonuses <= 2) {
        for (var damages = 1; damages <= 5; damages++) {
          var finalDamages = calcSkillDamageWithSecondaryBonuses(
            damages,
            battleValues,
            damagesType,
            damagesWithPrimaryBonuses,
            skillFormula
          );

          addKeyValue(
            damagesWeighted,
            finalDamages,
            (weight * damagesType.weight) / (5 * totalCardinal)
          );
          sumDamages += (finalDamages * weight * damagesType.weight) / 5;
        }
      } else {
        var finalDamages = calcSkillDamageWithSecondaryBonuses(
          damagesWithPrimaryBonuses,
          battleValues,
          damagesType,
          damagesWithPrimaryBonuses,
          skillFormula
        );

        addKeyValue(
          damagesWeighted,
          finalDamages,
          (weight * damagesType.weight) / totalCardinal
        );
        sumDamages += finalDamages * weight * damagesType.weight;
      }
    }

    addToTableResult(tableResult, damagesWeighted, minMaxDamages);
  }

  if (minMaxDamages.min === Infinity) {
    minMaxDamages.min = 0;
  }

  return [sumDamages / totalCardinal, minMaxDamages];
}

function createMonster(name) {
  var data = monsterData[name];

  var monster = {
    name: name,
    rank: data[0],
    race: data[1],
    attack: data[2],
    level: data[3],
    type: data[4],
    str: data[5],
    dex: data[6],
    vit: data[7],
    int: data[8],
    minAttackValue: data[9],
    maxAttackValue: data[10],
    defense: data[11] + data[3] + data[7],
    criticalHit: data[12],
    piercingHit: data[13],
    fistDefense: data[14],
    swordDefense: data[15],
    twoHandedSwordDefense: data[16],
    daggerDefense: data[17],
    bellDefense: data[18],
    fanDefense: data[19],
    arrowDefense: data[20],
    clawDefense: data[21],
    fireResistance: data[22],
    lightningResistance: data[23],
    magicResistance: data[24],
    windResistance: data[25],
    lightningBonus: data[26],
    fireBonus: data[27],
    iceBonus: data[28],
    windBonus: data[29],
    earthBonus: data[30],
    darknessBonus: data[31],
    darknessResistance: data[32],
    iceResistance: data[33],
    earthResistance: data[34],
    damageMultiplier: data[35],
  };

  return monster;
}

function createBattle(characters, battle) {
  function isPseudoSaved(pseudo) {
    return characters.savedCharacters.hasOwnProperty(pseudo);
  }

  battle.battleForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var battleInfo = new FormData(event.target);
    var attackerName = battleInfo.get("attacker");
    var attackType = battleInfo.get("attackTypeSelection");
    var victimName = battleInfo.get("victim");

    if (!attackerName && !attackType && !victimName) {
      return;
    }

    var attackerWeapon = null;

    if (isPseudoSaved(attackerName)) {
      var attacker = copyObject(characters.savedCharacters[attackerName]);

      if (weaponData.hasOwnProperty(attacker.weapon)) {
        attackerWeapon = weaponData[attacker.weapon];
      } else {
        attackerWeapon = weaponData[0];
      }
    } else {
      var attacker = createMonster(attackerName);
    }

    if (isPseudoSaved(victimName)) {
      var victim = copyObject(characters.savedCharacters[victimName]);
    } else {
      var victim = createMonster(victimName);
    }

    var meanDamages, minMaxDamages;
    var calcDamages;
    var skillId = 0;

    if (attackType === "physical") {
      calcDamages = calcPhysicalDamages;
    } else if (attackType.startsWith("attackSkill")) {
      skillId = parseInt(attackType.split("attackSkill")[1]);

      if (isMagicClass(attacker)) {
        calcDamages = calcMagicSkillDamages;
      } else {
        calcDamages = calcPhysicalSkillDamages;
      }
    }

    [meanDamages, minMaxDamages] = calcDamages(
      attacker,
      attackerWeapon,
      victim,
      battle.tableResult,
      battle.mapping,
      battle.constants,
      skillId
    );

    battle.damageResult.textContent =
      attacker.name +
      " inflige " +
      numberFormat(meanDamages, 1) +
      " dégâts en moyenne à " +
      victim.name +
      " (minimum : " +
      minMaxDamages.min +
      ", maximum : " +
      minMaxDamages.max +
      ").";

    showElement(battle.tableContainer);
  });

  battle.attackerSelection.addEventListener("change", function (event) {
    var attackerName = event.target.value;
    var attackTypeSelection = battle.attackTypeSelection;

    if (isPseudoSaved(attackerName)) {
      var attacker = characters.savedCharacters[attackerName];
      filterAttackTypeSelection(attacker, attackTypeSelection);
    } else {
      for (var option of attackTypeSelection.options) {
        if (option.dataset.class) {
          hideElement(option);
        }
      }
      
      if (attackTypeSelection.selectedIndex !== 1) {
        attackTypeSelection.selectedIndex = 0;
      }
    }
  });
}

function createMapping() {
  mapping = {
    typeFlag: [
      "animalBonus", // 0
      "humanBonus", // 1
      "orcBonus", // 2
      "mysticBonus", // 3
      "undeadBonus", // 4
      "insectBonus", // 5
      "desertBonus", // 6
      "devilBonus", // 7
    ],
    raceBonus: {
      warrior: "warriorBonus",
      sura: "suraBonus",
      ninja: "ninjaBonus",
      shaman: "shamanBonus",
      lycan: "lycanBonus",
    },
    raceResistance: {
      warrior: "warriorResistance",
      sura: "suraResistance",
      ninja: "ninjaResistance",
      shaman: "shamanResistance",
      lycan: "lycanResistance",
    },
    defenseWeapon: [
      "swordDefense", // 0
      "daggerDefense", // 1
      "arrowDefense", // 2
      "twoHandedSwordDefense", // 3
      "bellDefense", // 4
      "clawDefense", // 5
      "fanDefense", // 6
      "swordDefense", // 7
      "fistDefense", // 8
    ],
    breakWeapon: [
      "breakSwordDefense", // 0
      "breakDaggerDefense", // 1
      "breakArrowDefense", // 2
      "breakTwoHandedSwordDefense", // 3
      "breakBellDefense", // 4
      "breakClawDefense", // 5
      "breakFanDefense", // 6
      "breakSwordDefense", // 7
    ],
    elementBonus: [
      "fireBonus", // 0
      "iceBonus", // 1
      "windBonus", // 2
      "lightningBonus", // 3
      "earthBonus", // 4
      "darknessBonus", // 5
    ],
    elementResistance: [
      "fireResistance", // 0
      "iceResistance", // 1
      "windResistance", // 2
      "lightningResistance", // 3
      "earthResistance", // 4
      "darknessResistance", // 5
    ],
  };
  return mapping;
}

function createConstants() {
  var constants = {
    polymorphPowerTable: [
      10, 11, 11, 12, 13, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 26, 27,
      29, 31, 33, 35, 37, 39, 41, 44, 46, 49, 52, 55, 59, 62, 66, 70, 74, 79,
      84, 89, 94, 100, 0,
    ],
    skillPowerTable: [
      0, 0.05, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22, 0.24, 0.26,
      0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.5, 0.52, 0.54, 0.56, 0.58, 0.6,
      0.63, 0.66, 0.69, 0.72, 0.82, 0.85, 0.88, 0.91, 0.94, 0.98, 1.02, 1.06,
      1.1, 1.15, 1.25,
    ],
    marriageTable: {
      harmonyEarrings: [4, 5, 6, 8],
      loveEarrings: [4, 5, 6, 8],
      harmonyBracelet: [4, 5, 6, 8],
      loveNecklace: [20, 25, 30, 40],
      harmonyNecklace: [12, 16, 20, 30],
    },
  };
  return constants;
}

function createDamageCalculatorInformation() {
  var characters = {
    unsavedChanges: false,
    savedCharacters: {},
    currentCharacter: null,
    characterCreation: document.getElementById("character-creation"),
    addNewCharacterButton: document.getElementById("add-new-character"),
    uploadCharacter: document.getElementById("upload-character"),
    newCharacterTemplate: document.getElementById("new-character-template")
      .children[0],
    charactersContainer: document.getElementById("characters-container"),
    newMonsterTemplate: document.getElementById("new-monster-template")
      .children[0],
    monstersContainer: document.getElementById("monsters-container"),
    monsterListForm: document.getElementById("monster-list-form"),
    searchMonster: document.getElementById("search-monster"),
    monsterList: document.getElementById("monster-list"),
    saveButton: document.getElementById("save-button"),
    weaponCategory: document.getElementById("weapon-category"),
    weaponDisplay: document.getElementById("weapon-display"),
    randomAttackValue: document.getElementById("random-attack-value"),
    randomMagicAttackValue: document.getElementById(
      "random-magic-attack-value"
    ),
    skillContainer: document.getElementById("skill-container"),
    blessingCreation: document.getElementById("blessing-creation"),
  };

  delete characters.newCharacterTemplate.dataset.click;

  var savedCharacters = getSavedCharacters();
  var savedMonsters = getSavedMonsters();

  for (var [pseudo, character] of Object.entries(savedCharacters)) {
    characters.savedCharacters[pseudo] = character;
  }

  characters.savedMonsters = savedMonsters;

  var skillContainer = document.getElementById("skill-container");
  characters.skillElementsToFilter =
    skillContainer.querySelectorAll("[data-class]");

  var mapping = createMapping();
  var constants = createConstants();

  var battle = {
    resetAttackType: false,
    battleForm: document.getElementById("create-battle"),
    attackerSelection: document.getElementById("attacker-selection"),
    attackTypeSelection: document.getElementById("attack-type-selection"),
    victimSelection: document.getElementById("victim-selection"),
    damageResult: document.getElementById("result-damage"),
    tableContainer: document.getElementById("result-table-container"),
    tableResult: document.getElementById("result-table").children[0],
    mapping: mapping,
    constants: constants,
  };

  return [characters, battle];
}

function loadScript(src, callback) {
  var script = document.createElement("script");
  script.src = src;

  function onComplete() {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
    callback();
  }

  document.head.appendChild(script);

  script.onload = onComplete;
  script.onerror = onComplete;
}

function loadStyle(src) {
  var link = document.createElement("link");
  link.href = src;
  link.rel = "stylesheet";

  document.head.appendChild(link);
}

function loading() {
  var mainContainer = document.getElementById("hide-all");
  var loadingAnimation = document.getElementById("loading-animation");

  mainContainer.classList.remove("tabber-noactive");
  loadingAnimation.classList.add("tabber-noactive");
}

(function () {
  var javascriptSource =
    "/index.php?title=Utilisateur:Ankhseram/Calculator.js&action=raw&ctype=text/javascript";
  var cssSource =
    "/index.php?title=Utilisateur:Ankhseram/Style.css&action=raw&ctype=text/css";

  loadStyle(cssSource);

  function main() {
    var [characters, battle] = createDamageCalculatorInformation();

    characterManagement(characters, battle);
    monsterManagement(characters, battle);

    updateBattleChoice(characters, battle);
    createBattle(characters, battle);

    loading();
  }

  loadScript(javascriptSource, main);
})();
