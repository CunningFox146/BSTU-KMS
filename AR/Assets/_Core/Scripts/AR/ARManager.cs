using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

[RequireComponent(typeof(ARRaycastManager))]
public class ARManager : MonoBehaviour
{
    public static event Action<bool> PoseValidChange;

    public static ARManager Inst { get; private set; }

    [SerializeField] GameObject _objectToSpawn;
    [SerializeField] GameObject _indicator;

    private ARRaycastManager _raycastManager;

    private GameObject _spawnedObj;
    private Pose _pose;
    private bool _isPoseValid = false;

    public static ARRaycastManager RaycastManager => Inst._raycastManager;
    public static bool IsObjectSpawned => Inst._spawnedObj != null;
    public static bool IsPoseValid
    {
        get => Inst._isPoseValid;
        private set
        {
            if (Inst._isPoseValid == value) return;

            Inst._isPoseValid = value;
            PoseValidChange?.Invoke(value);
        }
    }

    void Awake()
    {
        Inst = this;

        _raycastManager = GetComponent<ARRaycastManager>();
    }

    void Update()
    {
        UpdatePlacementPose();
        UpdatePlacementIndicator();
    }

    public static void PlaceObject()
    {
        if (!IsPoseValid || Inst._spawnedObj) return;

        var pose = Inst._pose;
        Inst._spawnedObj = Instantiate(Inst._objectToSpawn, pose.position, pose.rotation);
    }

    public static void RemoveObject()
    {
        if (Inst._spawnedObj == null) return;
        Destroy(Inst._spawnedObj);
        Inst._spawnedObj = null;
    }

    void UpdatePlacementIndicator()
    {
        if (_spawnedObj == null && _isPoseValid)
        {
            _indicator.SetActive(true);
            _indicator.transform.SetPositionAndRotation(_pose.position, _pose.rotation);
            return;
        }

        _indicator.SetActive(false);
    }

    void UpdatePlacementPose()
    {
        var screenCenter = Camera.main.ViewportToScreenPoint(new Vector3(0.5f, 0.5f));
        var hits = new List<ARRaycastHit>();
        if (IsPoseValid = _raycastManager.Raycast(screenCenter, hits, TrackableType.Planes))
        {
            _pose = hits[0].pose;
        }
    }
}
