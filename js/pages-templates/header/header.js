const template = `
    <span class='header' id='main'><a>Главная</a></span>
    <span class='header' id='search'>
        <form id = 'search-form'>
            <button type'submit'><i class="material-icons search">search</i></button>
            <input name='search'>
            <div id='results'>
                <ul id='list'></ul>
            </div>
        </form>
    </span>
    
    <span class='header' id='auth'>
        <a></a>
        <ul id='cabinet-wrap'>
            <li><span id='usr-name'></span></li>
            <li id='cabinet'></li>
            <li id='logout'><a class='cabinet-a'>Выйти</a></li>
        </г>
    </span>
`
export default template;