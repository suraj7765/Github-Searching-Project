// Github API URL, जहां से हम Github यूज़र का डेटा प्राप्त करेंगे।
const url = "https://api.github.com/users";

// HTML में "searchInput" ID वाले तत्व को प्राप्त करना, जिससे हम यूज़र नाम प्राप्त करेंगे।
const searchInputEl = document.getElementById("searchInput");

// HTML में "searchBtn" ID वाले बटन को प्राप्त करना, जिस पर क्लिक करके सर्च होगा।
const searchButtonEl = document.getElementById("searchBtn");

// HTML में "profileContainer" ID वाले `div` को प्राप्त करना, जहां हम प्रोफ़ाइल डेटा दिखाएंगे।
const profileContainerEl = document.getElementById("profileContainer");

// HTML में "loading" ID वाले `div` को प्राप्त करना, ताकि लोडिंग संदेश दिखा सकें।
const loadingEl = document.getElementById("loading");

// यह एक फ़ंक्शन है जो प्रोफ़ाइल डेटा को HTML में अच्छे से दिखाने के लिए तैयार करता है।
const generateProfile = (profile) => {
  return `
    <div class="profile-box">
      <div class="top-section">
        <div class="left">
          <div class="avatar">
            <img alt="avatar" src="${profile.avatar_url}" /> <!-- यूज़र की प्रोफ़ाइल पिक्चर -->
          </div>
          <div class="self">
            <h1>${profile.name}</h1> <!-- यूज़र का पूरा नाम -->
            <h1>@${profile.login}</h1> <!-- Github यूज़रनेम -->
          </div>
        </div>
        <a href="${profile.html_url}" target="_black"> <!-- प्रोफ़ाइल लिंक पर क्लिक करने के लिए -->
          <button class="primary-btn">Check Profile</button> <!-- प्रोफ़ाइल देखने का बटन -->
        </a>
      </div>
      <div class="about">
        <h2>About</h2>
        <p>${profile.bio}</p> <!-- यूज़र के बारे में जानकारी (bio) -->
      </div>
      <div class="status">
        <div class="status-item">
          <h3>Followers</h3>
          <p>${profile.followers}</p> <!-- यूज़र के फॉलोअर्स की संख्या -->
        </div>
        <div class="status-item">
          <h3>Followings</h3>
          <p>${profile.following}</p> <!-- यूज़र के फॉलोइंग की संख्या -->
        </div>
        <div class="status-item">
          <h3>Repos</h3>
          <p>${profile.public_repos}</p> <!-- यूज़र के पब्लिक रिपोजिटरीज की संख्या -->
        </div>
      </div>
    </div>
  `;
};

// यह फ़ंक्शन प्रोफ़ाइल डेटा को प्राप्त करने के लिए API से डेटा fetch करता है।
const fetchProfile = async () => {
  // उपयोगकर्ता द्वारा सर्च बॉक्स में डाला गया यूज़रनेम प्राप्त करना।
  const username = searchInputEl.value;

  // लोडिंग संदेश दिखाना जब डेटा लोड हो रहा हो।
  loadingEl.innerText = "loading.....";
  loadingEl.style.color = "black"; // लोडिंग संदेश का रंग सेट करना।

  try {
    // API से डेटा प्राप्त करने के लिए fetch का उपयोग करना।
    const res = await fetch(`${url}/${username}`);
    // API से प्राप्त डेटा को JSON में बदलना।
    const data = await res.json();

    // यदि प्रोफ़ाइल में bio है, तो प्रोफ़ाइल डेटा दिखाना।
    if (data.bio) {
      loadingEl.innerText = ""; // लोडिंग संदेश को हटाना।
      profileContainerEl.innerHTML = generateProfile(data); // प्रोफ़ाइल डेटा को HTML में दिखाना।
    } else {
      // अगर प्रोफ़ाइल नहीं मिलती, तो API से आए संदेश को दिखाना।
      loadingEl.innerHTML = data.message;
      loadingEl.style.color = "red"; // संदेश का रंग लाल करना।
      profileContainerEl.innerText = ""; // प्रोफ़ाइल डेटा को साफ़ करना।
    }

    console.log("data", data); // कंसोल में डेटा लॉग करना।
  } catch (error) {
    console.log({ error }); // यदि कोई एरर होता है, तो उसे कंसोल में दिखाना।
    loadingEl.innerText = ""; // लोडिंग संदेश को हटा देना।
  }
};

// सर्च बटन पर क्लिक होने पर `fetchProfile` फ़ंक्शन को कॉल करना।
searchButtonEl.addEventListener("click", fetchProfile);
