using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class Hint : MonoBehaviour
{
    private static Hint _inst;

    public static Hint Inst
    {
        get => _inst;
        private set
        {
            if (_inst != null)
            {
                Destroy(value.gameObject);
                return;
            }
            _inst = value;
        }
    }

    private Coroutine _hideCoroutine;
    private Text _text;

    private void Awake()
    {
        Inst = this;
        _text = GetComponent<Text>();
    }

    public void ShowHint(string text, float duration)
    {
        _text.color = new Color(_text.color.r, _text.color.g, _text.color.b, 0f);
        _text.text = text;

        if (_hideCoroutine != null)
        {
            StopCoroutine(_hideCoroutine);
        }
        StartCoroutine(FadeCoroutine(false));
        _hideCoroutine = StartCoroutine(HideHintCoroutine(duration));
    }

    private IEnumerator HideHintCoroutine(float duration)
    {
        yield return new WaitForSeconds(duration);
        _hideCoroutine = StartCoroutine(FadeCoroutine(true));
    }

    private IEnumerator FadeCoroutine(bool isFadeOut)
    {
        float startTime = Time.time;
        float fadeDuration = 1f;

        while (true)
        {
            float percent = Mathf.Clamp01((Time.time - startTime) / fadeDuration);
            if (percent >= 1f)
            {
                yield break;
            }

            float alpha = isFadeOut ? (1f - percent) : percent;
            _text.color = new Color(_text.color.r, _text.color.g, _text.color.b, alpha);

            yield return null;
        }
    }
}
