var socket = io();

//Do scripts after load
window.addEventListener('load', () => {
    //Add listner on generate button
    var button = document.getElementById('generate');
    button.addEventListener('click', (e) => {
        var user_profile = document.getElementById('user_profile').value;
        e.preventDefault(); // prevents page reloading
        socket.emit('generate_link', user_profile);
        return false;
    })
});

function copy_to_clipboard() {
    var copyText = document.getElementsByClassName("i-copy")[0];
    copyText.select();
    document.execCommand("copy");
    var tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Deeplink copied!";
}

function copy_to_clipboard_hover() {
    var tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Click to copy to clipboard.";
}

socket.on('server_collback', (data) => {

    var user_profile = document.getElementById('user_profile').value;
    var alert_box = document.createElement('div');

    if (document.getElementsByClassName('notify').length == 0) {

        if (user_profile == 0) {

            //Empty user, error alert
            var p = document.createElement('p');
            p.className = 'error'
            p.textContent = 'Please, enter instagram profile name.'

            document.body.append(alert_box);

            alert_box.className = 'notify';
            alert_box.append(p)

        } else if (user_profile != 0) {

            //User not empty, add deeplink
            var p = document.createElement('p');
            p.textContent = 'Your deeplink: '

            var i = document.createElement('input');
            i.className = 'input i-copy'
            i.value = document.location.origin + data.split('.')[1]

            var b = document.createElement('button');
            b.innerHTML = 'Copy<span class="tooltiptext" id="tooltip">Click to copy to clipboard.</span>'
            b.className = 'copy btn tooltip'
            b.onclick = copy_to_clipboard
            b.onmouseout = copy_to_clipboard_hover

            document.body.append(alert_box);

            alert_box.className = 'notify';

            alert_box.append(p)
            alert_box.append(i)
            alert_box.append(b)

        }

    } else if (document.getElementsByClassName('notify').length > 0) {

        try {
            //Remove old element
            document.getElementsByClassName('notify')[0].firstChild.remove()
            document.getElementsByClassName('notify')[0].firstChild.remove()
            document.getElementsByClassName('notify')[0].firstChild.remove()

        } catch (e) {}

        if (user_profile == 0) {

            //Empty user, error alert
            var p = document.createElement('p');
            p.className = 'error'
            p.textContent = 'Please, enter instagram profile name.'

            document.getElementsByClassName('notify')[0].append(p)
            document.getElementsByClassName('notify')[0].className = 'notify';

            setTimeout(() => {
                document.getElementsByClassName('notify')[0].className = 'notify';
            }, 250, clearTimeout());

        } else if (user_profile != 0) {

            //User not empty, add deeplink
            var p = document.createElement('p');
            p.textContent = 'Your deeplink: '

            var i = document.createElement('input');
            i.className = 'input i-copy'
            i.value = document.location.origin + data.split('.')[1]

            var b = document.createElement('button');
            b.innerHTML = 'Copy<span class="tooltiptext" id="tooltip">Click to copy to clipboard.</span>'
            b.className = 'copy btn tooltip'
            b.onclick = copy_to_clipboard
            b.onmouseout = copy_to_clipboard_hover

            document.getElementsByClassName('notify')[0].append(p)
            document.getElementsByClassName('notify')[0].append(i)
            document.getElementsByClassName('notify')[0].append(b)
        }

    }
});