import React from 'react';

function InfoPage() {
  return (
    <div className="container">
      <h2>Info Page</h2>

      <div>
        <h3>Technologies Used</h3>
        <ul className='columns-3'>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" />
            </a>
            - JavaScript
          </li>
          <li>
            <a href="https://reactjs.org/">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" />
            </a>
            - React.js
          </li>
          <li>
            <a href="https://redux.js.org/">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" />
            </a>
            - Redux.js
          </li>
          <li>
            <a href="https://material-ui.com/">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" />
            </a>
            - Material-Ui
          </li>
          <li>
            <a href="https://nodejs.org/en/">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" height="40px" width="40px" />
            </a>
            - Node.js
          </li>
          <li>
            <a href="https://www.postgresql.org/">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" />
            </a>
            - Postgres
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" />
            </a>
            - CSS3
          </li>
          <li>            
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" />
            </a>
            - HTML5
          </li>
          <li>
            <a href="https://sweetalert2.github.io/">
              <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQUExYUEBMUFhMXFhcZExYZFhYZFhYWGRMXGBYYGBYZHikhGRsmHBYWIjIiJiosLy8vGCA1OjUtOSkuLywBCgoKDg0OGxAQHCwmIR4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4sLi4uLi4uLi4uLi4uLi45LP/AABEIAMAAwAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcCAf/EADsQAAEDAQYDBQYEBQUBAAAAAAEAAgMRBAUGITFBElFhEyIycYFCkaGxwdEHI1JicpKi4fAUJDOCshX/xAAZAQACAwEAAAAAAAAAAAAAAAAABAECAwX/xAAvEQACAQMDAgMIAgMBAAAAAAAAAQIDESEEEjFBURMi8DJxgZGhsdHxYcEkQmIF/9oADAMBAAIRAxEAPwDuKIiACIiACIiACIiACIiACr+LbfJFG3szwlxIJGuQ2VgVXxy0lkdAaBxqeWSvT9pEx5N3CtufLETIakGldyptV7BcREJJBFXZKwqJ23MHyERFUgIiIAIiIAIiIAIiIAIiIAIijr8tD44XOiHeFOtM8yhK7sBIoqRc+KHtdSc8TTvuPurlBM17Q5pBadCFaUHHklqxlRFpXjecULeKV4b03PkFUg3UVBvTHxzFnZ/2d9AoM2u22k5GVw6VDfstlQl1waKm+p1Ce3xM8cjB5kLSmv6y6OmiI5VBVEgwXan5uDW+bq/Jbrfw+l3lj/q+ynw6a5kTtj3LhFf1m0bNEOQ4gFuw2yN/ge0+RCoL/wAPptpYz/N9loz4PtbM2gOp+l33R4dN8SDbB8M6oi5NHe1ts5o4yAcnglvxVhurHzTQWhnD+5uY9QodCS4yQ6b6F4Ra1jtscreKJ4cOh+fJbKxMwi8SSBoJcaAalUS+sQSSSfkuc1gNG09o8yrQg5PBKVy/ItW7nPMTDJ4y0cS2lUgIiIAIiIAL4QvqIAq1+4Z4jxwUB3bseoUlh2wugh4ZCK1J1yAUq40zOi55i7FRkJhs5ozRzhq48h0Wsd0/KXjeWCTxJjNsdY7NRz9C/wBlvlzKrF3XNaLY/jcTwnV7tPQKZwvg+oEtqFBq1h+bvsrj/wDQgZ3BIwU0aCMvRXc4wVofMvuUcRIq6MHwQ0Lh2j+btPQKbkmjjGZa0ch9goa332TlFkP1b+iiHvJNSST1SNTU9smkdPKWZsmrZiVjTRjS7qclqvv2Q6UA8lFPjB1XtLurJ9RlUaaWF8zcN6TH2ijb0lHtn4KvWu2Emjch8St+ycXCOLVaTpVIQUpPnp1Kx2SlZIlHXu8ikgY4bhwUReF02eWpa0xP5tzb6hfLYcws0HhCrGtUhlM0dCFrlcrPZH8THEciPCfMK84bxcyejJaMl/pd5clFSRhwo4Ag7Ku3pdBj78VeHWm7U9S1EK3lnh9zCpRxc6XiKyPkhLY9ajLmOSh8O4cLXdpOKU8LevMrUwdivipDaD3tGPO/Q9VeFeW6HlE3eOAiIsioREQAREQARFF4hvMQQOk9rRg5uOn3UpXwCVyt47xDw/7eI5n/AJCNh+lYsEYZyE846xtP/oqGwpdZtU5fJUsaeJ55muQ/zkuoSSNY2pyaAt6klBbF8TaT2raiBxlHIWN4D3a95taV5Kqw2B1QXGnzU5eFrMrqnTYcgtZIPVSStEZp0El5gsMlooaUWZYpYQfNKoZVr5PbHg6L0sEEJBzWeqjAPnBrx2NoNQP7LYRFaU3J3buVUUuDFLCHL20UyWG02sMypUrHFb2kgUIqrqjUcdyWCHUjezZuIhKh7Tf7GmjWl1N9AqwpTqO0VcltLk077u3gPaR+GuYHsn7K6YJxB27OykP5rBkf1N5+arEd9QvBD6tqMwdFDWa19jMJIT4XVB5jkupR3zg4VE7rhi1WEZLB2tFpXVb2zxNkbo4Zjkdwt1ZCbVgiIggIiIALmv4g3iZJhC3Rmo5uP+UXRZ5A1rnHQAk+gXK7giNotoc7d5e70z+a3oLLk+hpT5v2OgYVuwQQMbTvEcTz1K08QW2p4Ae63XqVN2+0dmwu6Zeap786131SOoqdO5tpobnvZrf6odVmY8EVCwmyjqs0bKCgSjsPvb0PSwWm1sj8bgPmskziGkgVIBoFXLquya1ykCv73HRo/wA2TOmoKrdydkjKc9pvX1NIWsMNS06luvRR7botbsxFMfRy6ndF1sgjDGZ01J1JUgnKU1TjtSXvE517vBxqW7rVGKujmaOdHUX2zX3K3J3eHI6rsihr4w5DODxNDX7Pbk6vXmtHUhPE4oiNdoplnninH7hqNwtiOwtBrmoG+Lplskorp7Dxo4ffopu7LcJWV9oeIdUpqKc6Ubwk9r+g1Bxlli9q9i/h1ooHD9likkLZjTLuitKnzVqIVbvK5XNJdFm3Wm4RpKkdsqbe1vhlqkW8ok7ThJpP5chA5HNa9vwyI4nPDy57c6bU3WK5L/exwZKSWVpU6t/sreQCKagj4FVq1tTQklN3X3MlYgvw+vXgc6Jx7pzH1XR1xqzkwWkftfT/AKk/ZdZu2fiZ1GX2W9WyqY4krr+/6ZhVj1NxERQYGGW0Mbk5zQepC+MtTDo9p9QqjftwzPmc9o4mk1BroOS0YsO2gOFGUz1rotVCNuS21dy1Yvn4LLKebeH35KrfhnZ6vlk5NDfeQfopjHdW2PhJqasBPMjVan4b5QzO/cPg0q0cUmXWIMlMRWwEiNrgSM3CvuUKomI1mr+4/NSy5+qhsn7xyh7FuwRR1unc12RoNuq3YJOIAhZzpSjBTfDNFNNtdiJvK+HMk4GAECleZqulXfZmsjaGtAyBOWZPVcosbeO2MB0MzQf5qLsSflSjCMbLNhKvNvAREVRcIiIAjb+uxtoidG4Z0q08nbFckgtD4HuAycKtcDzBXbVyXGsIZbJKaHhd6kVKYo+a8HwzajKzsY4MQvB77QR0yKmbLeEbxVrh5HIhbU11QzRtqwAloo5ooRkq9acLzNPc4XDY1oUknpq3/D+g2pyXJq4gLO07lNO9TSquVzk9hHxa8IUFdmFzxB0xFB7I38yrQBTIaKmrqwcI04u+3qV5dylYti4Z6j2mg+oy+ivmG7TUMP6mD30VOxq3vRnoR8VP4Xk/JhPKivUl/j0p9nb18isldNF0REWokEREAVj8Q2/7U9HtWn+GhrDKP3j4gqXxlBx2WSmw4vdmq3+GVo70sfMB3uy+q3jmkzVewzJPY2NlcWjc06L6s9uFJH/xFak0nCFyJSlJ5dzowikkkY7XZ+MdRovVkg4BStV6ifUVWRT4ktmzoG1br9SqRSdnamuOjZQ4/wA1V2UFcfxHZ+GTj2cPiF0HBt7CeBoJ/MYA143y0PqurJ76cZrsI145LAiIsRcIiIALkuN5Q+2SU24W+oFCul3zeTYInSPOg7o5u2AXKrqidaLTV2dXcbz61W9F7E5vhI2orNy72VtGNHJo+Syoi4IyEREAVTGzu9GOhPxU1h0Ugj8lW8YS1nAHstA9+f1Vuu2PhijbyaPkn6/l0tNd8/f8kLktjNB5Be14j0HkF7TAiEREAYLXCHscw6OaQfULl2FpzBbA12XeLHeuQ+NF1hcwx5YTDaO1bkH94Hk4areg+Yvqa083XcsF8MpM7qarSc0HVbElrE8UUo1LeF/RzVgXJqR2zaY/SflR5AAXoFa9rOXqlk09VXpc1ti58t9kErC0+h5FVy77bLZJuJuThk4bOCti1bdYWSijhnsdwmtNqfD8suGZThuRarjxJDaAOFwbJuwnP05hTa4neNhMLgOKtcwRqs8N9WpgAbLKG7Zmnon1RjNboPDEpUTsqi72vyGAVkeK7NGbj6LmD78tT8u1lPQE/RLJcc8pqQWg6ud9tVEqUYZnJJEKjnJ7vy+pbXIMiG1pHGNup5lWW4br7Bmfjd4jy6L7dNzMgFR3n7uP05KSXP1WrVRbIez9xiMbBERIkhfCaZr6orEdt7OE08Tu636lWhBzkorlgVc/n2r+J/wBp8lf4W5gdQqjg2x1c6U6Dut891drsjq8dM09rWpVY01xGy9fQq3ZNk6AvqItxIIiIAKFxVdX+ohc0eNveZ5jb10U0ilNp3RKdjkmH7w7Iuhkya47+y8KwLBjzD3CTPEO6f8AkA2P6lG3HefEOzee8PCeY+6rq6W9eLH4/kfozTJaSOozSNlBQL2o6/bQWRHh1JokIRc5KC6m7dkZZr0iaaF4r0Waz2pj/A4FV25rkdOHO4g0A051KxWyxy2eQV11a4aFPPS0XJ04z8yMfEfVEhiezk8LxoMj0Ulhi3NkjEbgONmxAzHNfLFaWzR50zFHBV19YLR3D4XCnlyUQj41N0JYlHgJrO5dS/tjA0aB6Be15BX1crnJUIiKQCIiAPjnACpyA1Kot72x1pmAZpXhYPmVJYnvmtYYzl7ZHyCz4VunhHavHePgHIc10tPFaen40+XhL16sQ84Jm7rIIo2sGwz6ndWG6YaNLjvp5KMs0Je4AevkrAxlAANAl9PFyk5y9MyrSxY9oiJ0WCIiAC0rzvBsLC9/oNyeS3VQ8Vdq+fhLXECgYADTPdXhHcyYq7JG57+dPIYpGAscD6DqqzizDLoHdrECYia5asPXorxh65hAyrs5HDvHl0ClZIw4EOAIOoKuqm2Xl4LKW14OX3TfIdRspo7Y7H+62b7s5fEaajMdVt4lwWRWSyio1Me4/hVbs16yxVY4Vps7ULKWmW5VKPToOwqqSszcwjb+F5ido/Nv8Sst6WBszCx2R1aeRVIuppfaGEUHf4jsBnUroaX1/krKUcN5+JVFBmui0RHJrvNu/uW3c9xSPkDpQWtBqa6uVzXxRL/0KjjayT7hY+r4iJAkIijbwvyGLV3E79LfurQhKbtFXAkSaZnTdVi/sQ6xwHo5/wBAo233vNaDwtBDToxu/mVLXLhsNo+fN2zNh580/ChT06318vpH1+veRe/Bq4duMuIllHd1a0+0eZ6K3NGw9Ea3YeimLBYuHvO8Ww5Jec56md3+vX1KykoIy2CzcDc/EdfsttETsYqKshRtt3YREUkBERABeeEcl6RABERABRF8YfhtA77aO2eMnf39VLopTa4BOxyy9sHTRGsffbsRkVHR3jaYciXjo4V+a7GQtC1XWx+w92XuUyrStaSUl/OH+Psbxq9znMOLXjxRtPlULaZi5u8R9CFYrXhWM59kw+WSjpcLQ7xuHqUvKWl/2ptevebKSfDI1+LhtEfUrVnxZIfAxrfeVNNw5Zx7BPmStqG6YW+GJvuqq+LpI8Qb9/7LWZTnWq0zmgL3V2AoPgt2w4Vec5XBo5DMq4xwnRrT6BbEV3vO1PNS9bUa20o7V/Hq30KtpcsjLDd0cQpG0Dmdz6regs7nnuj12UnDdjR4jX5LdY0DICgWUdPKT3VH+TOVZdDWsliDM9Xc/stxETcYqKshdtt3YREUkBERABERABERABERABERABERABfCvqIA88A5D3JwDkPcvSIA+AL6iIAIiIAIiIAIiIAIiIA//9k=" height="40px" width="40px" />
            </a>
            - SweetAlert2, used for creating confirmation pop-ups
          </li>
        </ul>
      </div>

      <div>
        <h3>Toughest Challenge</h3>
        <p>The toughest challenge I overcame was setting up the conversion logic for seamlessly showing the shopping list</p>
      </div>

      <div>
        <h3>Next Steps</h3>
        <p>
          Now that I have the app functioning, the next challenge I am wanting to tack is filtering out recipes based on dietary restrictions.
          This would help planning and preparing food for friends and family that have different dietary needs a breeze.
        </p>
      </div>

      <div>
        <h3>Acknowledgements</h3>
        <ui>
          <li>
            Thanks to <a href="https://www.primeacademy.io">Prime Digital Academy</a> who taught me what I needed to know to make this application a reality.
          </li>
          <li>
            Thanks to my wonderful partner Brooke, your support really helped me be able to get this app working. 
          </li>
        </ui>
      </div>

    </div>
  );
}

export default InfoPage;
