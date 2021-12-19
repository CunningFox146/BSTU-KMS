using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class PlacementButton : MonoBehaviour
{
    private TMP_Text _text;
    private Button _button;

    private bool _pressed = false;

    private void Awake()
    {
        _text = GetComponentInChildren<TMP_Text>();
        _button = GetComponent<Button>();

        _button.onClick.AddListener(OnClickHandler);
        ARManager.PoseValidChange += OnPoseValidChangeHander;
    }

    private void Start()
    {
        OnPoseValidChangeHander(ARManager.IsPoseValid);
    }

    private void OnPoseValidChangeHander(bool isValid)
    {
        _button.interactable = isValid;
    }

    private void OnClickHandler()
    {
        _pressed = !_pressed;
        _text.text = _pressed ? "Переместить" : "Установить";

        if (_pressed)
        {
            ARManager.PlaceObject();
        }
        else
        {
            ARManager.RemoveObject();
        }
    }
}