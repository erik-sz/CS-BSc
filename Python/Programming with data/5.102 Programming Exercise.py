from bs4 import BeautifulSoup as bs
import requests

def get_soup(URL):
    r = requests.get(URL)
    print(r.url)
    data = r.text
    soup = bs(data, "html.parser")
    return soup

def visit_anchors(soup):
    anchor_arr = soup.find_all('a')
    for anchor in anchor_arr:
        if 'underline-on-hover' in anchor['class']:
            temp_soup = get_soup(anchor['href'])
            els = temp_soup.main.find_all('article')
            for el in els:
                paras = el.find_all('p')
                for para in paras:
                    print(para.get_text())

soup = get_soup("https://www.denofgeek.com/")
visit_anchors(soup)
