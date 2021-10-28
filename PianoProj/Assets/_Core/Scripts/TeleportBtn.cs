using UnityEngine;
using UnityEngine.UI;

public class TeleportBtn : MonoBehaviour
{
    [SerializeField] private Vector3 _targetPos;
    [SerializeField] private Vector3 _targetRot;
    [SerializeField] private FirstPersonController _player;

    private Vector3 _pos;
    private Vector3 _rot;

    private Button _btn;
    private Text _text;

    private bool _isZoomed = false;

    private void Awake()
    {
        _text = GetComponentInChildren<Text>();
        _btn = GetComponent<Button>();

        //_btn.onClick.AddListener(OnClickHandler);
    }

    private void OnClickHandler()
    {
        var camera = Camera.main;

        _isZoomed = !_isZoomed;
        _player.enabled = !_isZoomed;

        if (_isZoomed)
        {
            _pos = _player.transform.position;
            _rot = _player.transform.eulerAngles;

            _player.transform.position = _targetPos;
            _player.transform.eulerAngles = _targetRot;
            Camera.main.transform.localEulerAngles = new Vector3(-13.321f, -59.071f, 12f);
        }
        else
        {
            _player.transform.position = _pos;
            _player.transform.eulerAngles = _rot;
        }
    }
}

